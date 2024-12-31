import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, users } from "../connect";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = z.object({
  user_id: z.string(),
  email: z.string(),
  password: z.string(),
  created_at: z.string(),
});

const loginSchema = userSchema.omit({
  user_id: true,
  created_at: true,
});

export const userRoute = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const data = await c.req.valid("json");
      const loginInfo = loginSchema.parse(data);
      const queryResult = await db
        .select()
        .from(users)
        .where(eq(users.email, loginInfo.email));
      const user = queryResult[0];
      if (!user) return c.json({ result: { user: null, token: null } });
      const isPasswordValid = await bcrypt.compare(
        loginInfo.password,
        user.password || ""
      );
      if (!isPasswordValid) {
        return c.json({ result: { user: null, token: null } });
      }
      const token = jwt.sign(
        { id: user.user_id },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "14 days" }
      );
      return c.json({ result: { user, token } });
    } catch (error) {
      console.error(error);
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  })
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
        .from(users)
        //@ts-ignore
        .where(eq(users.user_id, decodedUser.id));
      const user = response[0];
      return c.json({ result: { user, token } });
    } catch (err) {
      c.status(401);
      return c.json({ err });
    }
  });
