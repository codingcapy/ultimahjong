import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, records } from "../connect";
import { eq } from "drizzle-orm";

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

const getRecordsSchema = recordSchema.omit({
  record_id: true,
  created_at: true,
  winner: true,
  loser: true,
  points: true,
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
      const [insertedRecord] = await db
        .insert(records)
        .values({
          game_id: record.game_id,
          winner: record.winner,
          loser: record.loser,
          points: record.points,
          created_at: timestamp,
        })
        .returning();
      return c.json({ success: true, record: insertedRecord });
    } catch (err) {
      console.log(err);
      c.status(500);
      return c.json({
        success: false,
        message: "Internal Server Error: could not create record",
      });
    }
  })
  .get("/:game_id", async (c) => {
    try {
      console.log("function running");
      const game_id = Number.parseInt(c.req.param("game_id"));
      const incomingRecords = await db
        .select()
        .from(records)
        .where(eq(records.game_id, game_id));
      return c.json(incomingRecords);
    } catch (err) {
      console.log(err);
      c.status(500);
      return c.json({
        success: false,
        message: "Internal Server Error: could not get records",
      });
    }
  });
