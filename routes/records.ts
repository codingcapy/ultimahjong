import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, records } from "../connect";

const recordSchema = z.object({
  record_id: z.number(),
  game_id: z.number(),
  winner: z.string(),
  loser: z.string(),
  points: z.number(),
  created_at: z.string(),
  active: z.boolean().default(true),
});

const createRecordSchema = recordSchema.omit({
  record_id: true,
  created_at: true,
  active: true,
});

export const recordsRoute = new Hono()
  .post("/", zValidator("json", createRecordSchema), async (c) => {
    console.log("function running");
    try {
      const data = await c.req.valid("json");
      console.log(data);
      const record = createRecordSchema.parse(data);
      const now = new Date();
      const timestamp = now.toISOString();
      await db.insert(records).values({
        game_id: record.game_id,
        winner: record.winner,
        loser: record.loser,
        points: record.points,
        created_at: timestamp,
      });
      return c.json({ success: true });
    } catch (err) {
      console.log(err);
      c.status(500);
      return c.json({
        success: false,
        message: "Internal Server Error: could not create record",
      });
    }
  })
  .get("/:game_id", (c) => {
    return c.json({ success: true });
  });
