import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, users } from "../connect";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

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
  zValidator("json", createUserSchema),
  async (c) => {
    console.log("function running");
    try {
      const data = await c.req.valid("json");
      const user = createUserSchema.parse(data);
      if (user.password.length > 80) {
        return c.json({
          success: false,
          message: "password max char limit is 80",
        });
      }
      if (user.email.length > 255) {
        return c.json({
          success: false,
          message: "email max char limit is 255",
        });
      }
      const usernameQuery = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));
      if (usernameQuery.length > 0) {
        return c.json({
          success: false,
          message: "Username already exists",
        });
      }
      const emailQuery = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));
      if (emailQuery.length > 0) {
        return c.json({
          success: false,
          message: "An account associated with this email already exists",
        });
      }
      const encrypted = user.password;
      const user_id = uuidv4();
      const now = new Date();
      const timestamp = now.toISOString();
      //@ts-ignore
      await db.insert(users).values({
        user_id,
        email: user.email,
        password: encrypted,
        created_at: timestamp,
      });
      const userQuery = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));
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
