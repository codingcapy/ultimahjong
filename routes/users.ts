import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, users as usersTable } from "../connect";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import { randomBytes, scrypt } from "crypto";
import { createInsertSchema } from "drizzle-zod";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
}

const userSchema = z.object({
    user_id: z.string(),
    email: z.string(),
    password: z.string(),
    created_at: z.string(),
});

const createUserSchema = userSchema.omit({
    user_id: true,
    created_at: true,
});

export const usersRoute = new Hono().post(
    "/",
    zValidator("json", createInsertSchema(usersTable)),
    async (c) => {
        console.log("function running");
        try {
            const data = await c.req.valid("json");
            if (data.password.length > 80) {
                return c.json({
                    success: false,
                    message: "password max char limit is 80",
                });
            }
            if (data.email.length > 255) {
                return c.json({
                    success: false,
                    message: "email max char limit is 255",
                });
            }
            const emailQuery = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, data.email));
            if (emailQuery.length > 0) {
                return c.json({
                    success: false,
                    message:
                        "An account associated with this email already exists",
                });
            }
            const encrypted = await hashPassword(data.password);
            const user_id = uuidv4();
            const now = new Date();
            const timestamp = now.toISOString();
            //@ts-ignore
            await db.insert(users).values({
                user_id,
                email: data.email,
                password: encrypted,
                created_at: timestamp,
            });
            const userQuery = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, data.email));
            // const newUser = userQuery[0];
            // sendVerificationEmail(newUser)
            c.status(200);
            return c.json({
                success: true,
                message: "Success! Redirecting...",
            });
        } catch (err) {
            console.log(err);
            c.status(500);
            return c.json({
                success: false,
                message: "Internal Server Error: could not create user",
            });
        }
    }
);
