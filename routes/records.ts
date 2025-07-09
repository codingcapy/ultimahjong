import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "../connect";
import { records as recordsTable } from "../schema/records";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const recordsRoute = new Hono()
    .post(
        "/",
        zValidator("json", createInsertSchema(recordsTable)),
        async (c) => {
            console.log("function running");
            try {
                const data = c.req.valid("json");
                const now = new Date();
                const [insertedRecord] = await db
                    .insert(recordsTable)
                    .values({
                        winner: data.winner,
                        loser: data.loser,
                        points: data.points,
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
        }
    )
    .get("/:game_id", async (c) => {
        try {
            console.log("function running");
            const game_id = Number.parseInt(c.req.param("game_id"));
            const incomingRecords = await db
                .select()
                .from(recordsTable)
                .where(eq(recordsTable.gameId, game_id));
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
