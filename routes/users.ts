import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { db } from "../connect";
import { users as usersTable } from "../schema/users";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import { randomBytes, scrypt } from "crypto";
import { mightFail } from "might-fail";
import { HTTPException } from "hono/http-exception";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
}

export const usersRoute = new Hono()
    .post(
        "/",
        zValidator(
            "json",
            createInsertSchema(usersTable).omit({
                userId: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            if (data.password.length > 80) {
                return c.json({
                    user: null,
                    success: false,
                    message: "password max char limit is 80",
                });
            }
            if (data.email.length > 255) {
                return c.json(
                    {
                        user: null,
                        success: false,
                        message: "email max char limit is 255",
                    },
                    400
                );
            }
            const { error: emailQueryError, result: emailQueryResult } =
                await mightFail(
                    await db
                        .select()
                        .from(usersTable)
                        .where(eq(usersTable.email, data.email))
                );
            if (emailQueryError) {
                throw new HTTPException(500, {
                    message: "Error while fetching user",
                    cause: emailQueryResult,
                });
            }
            if (emailQueryResult.length > 0) {
                return c.json(
                    {
                        user: null,
                        success: false,
                        message:
                            "An account associated with this email already exists",
                    },
                    400
                );
            }
            const encrypted = await hashPassword(data.password);
            const userId = uuidv4();
            const { error: userInsertError, result: userInsertResult } =
                await mightFail(
                    await db
                        .insert(usersTable)
                        .values({
                            userId,
                            email: data.email,
                            password: encrypted,
                        })
                        .returning()
                );
            if (userInsertError) {
                console.log("Error while creating user");
                throw new HTTPException(500, {
                    message: "Error while creating user",
                    cause: userInsertResult,
                });
            }
            return c.json({ user: userInsertResult[0] }, 200);
        }
    )
    .get(async (c) => {
        const { error: usersQueryError, result: usersQueryResult } =
            await mightFail(db.select().from(usersTable));
        if (usersQueryError) {
            throw new HTTPException(500, {
                message: "Error while fetching users",
                cause: usersQueryError,
            });
        }
        return c.json({ users: usersQueryResult }, 200);
    });
