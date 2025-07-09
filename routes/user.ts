import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../connect";
import { users as usersTable } from "../schema/users";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { scrypt } from "crypto";
import { createInsertSchema } from "drizzle-zod";

const scryptAsync = promisify(scrypt);

async function verifyPassword(hash: string, password: string) {
    const [salt, key] = hash.split(":");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return derivedKey.toString("hex") === key;
}

export const userRoute = new Hono()
    .post(
        "/login",
        zValidator(
            "json",
            createInsertSchema(usersTable).omit({
                userId: true,
                createdAt: true,
            })
        ),
        async (c) => {
            try {
                const data = c.req.valid("json");
                const queryResult = await db
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.email, data.email));
                const user = queryResult[0];
                if (!user)
                    return c.json({ result: { user: null, token: null } });
                const isPasswordValid = await verifyPassword(
                    user.password,
                    data.password
                );
                if (!isPasswordValid) {
                    return c.json({ result: { user: null, token: null } });
                }
                const token = jwt.sign(
                    { id: user.userId },
                    process.env.JWT_SECRET || "default_secret",
                    { expiresIn: "14 days" }
                );
                return c.json({ result: { user, token } });
            } catch (error) {
                console.error(error);
                c.status(500);
                return c.json({ message: "Internal Server Error" });
            }
        }
    )
    .post("/validation", async (c) => {
        try {
            const authHeader = c.req.header("authorization");
            if (!authHeader) {
                c.status(403);
                return c.json({ message: "Header does not exist" });
            }
            const token = authHeader.split(" ")[1];
            const decodedUser = jwt.verify(token, "default_secret");
            const response = await db
                .select()
                .from(usersTable)
                //@ts-ignore
                .where(eq(usersTable.userId, decodedUser.id));
            const user = response[0];
            return c.json({ result: { user, token } });
        } catch (err) {
            c.status(401);
            return c.json({ err });
        }
    });
