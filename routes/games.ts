import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, games, users } from "../connect";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const gameSchema = z.object({
  game_id: z.number(),
  year: z.string(),
  created_at: z.string(),
  active: z.boolean().default(true),
});

const createGameSchema = gameSchema.omit({
  game_id: true,
  created_at: true,
  active: true,
});

export const gamesRoute = new Hono()
  .post("/", zValidator("json", createGameSchema), async (c) => {
    console.log("function running");
    try {
      const data = await c.req.valid("json");
      const game = createGameSchema.parse(data);
      const now = new Date();
      const timestamp = now.toISOString();
      await db.insert(games).values({
        year: game.year,
        created_at: timestamp,
      });
      return c.json({
        success: true,
        message: "Success! Redirecting...",
      });
    } catch (err) {
      console.log(err);
      c.status(500);
      return c.json({
        success: false,
        message: "Internal Server Error: could not create game",
      });
    }
  })
  .get("/", async (c) => {
    const incomingGames = await db.select().from(games);
    return c.json(incomingGames);
  });
