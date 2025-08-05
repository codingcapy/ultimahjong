import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { db } from "../connect";
import { records as recordsTable } from "../schema/records";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { mightFail } from "might-fail";
import { HTTPException } from "hono/http-exception";

export const recordsRoute = new Hono()
    .post(
        "/",
        zValidator("json", createInsertSchema(recordsTable)),
        async (c) => {
            const data = c.req.valid("json");
            const { error: recordInsertError, result: recordInsertResult } =
                await mightFail(
                    db
                        .insert(recordsTable)
                        .values({
                            winner: data.winner,
                            loser: data.loser,
                            points: data.points,
                        })
                        .returning()
                );
            if (recordInsertError) {
                console.log("Error while creating record");
                throw new HTTPException(500, {
                    message: "Error while creating record",
                    cause: recordInsertError,
                });
            }
            return c.json({ success: true, record: recordInsertResult });
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
    })
    .get("/", async (c) => {
        const { result: recordsQueryResult, error: recordsQueryError } =
            await mightFail(db.select().from(recordsTable));
        if (recordsQueryError) {
            throw new HTTPException(500, {
                message: "Error occurred when fetching games.",
                cause: recordsQueryError,
            });
        }
        return c.json({ records: recordsQueryResult });
    })
    .post(
        "/delete",
        zValidator(
            "json",
            createInsertSchema(recordsTable).omit({
                gameId: true,
                winner: true,
                loser: true,
                points: true,
                active: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            const { error: recordDeleteError, result: recordDeleteResult } =
                await mightFail(
                    await db
                        .update(recordsTable)
                        .set({
                            active: false,
                        })
                        .where(eq(recordsTable.recordId, Number(data.recordId)))
                        .returning()
                );
            if (recordDeleteError) {
                console.log("Error while creating user");
                throw new HTTPException(500, {
                    message: "Error while creating user",
                    cause: recordDeleteError,
                });
            }
            return c.json({ record: recordDeleteResult[0] }, 200);
        }
    )
    .post(
        "/update",
        zValidator(
            "json",
            createInsertSchema(recordsTable).omit({
                active: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            const { error: recordUpdateError, result: recordDUpdateResult } =
                await mightFail(
                    await db
                        .update(recordsTable)
                        .set({
                            winner: data.winner,
                            loser: data.loser,
                            points: data.points,
                        })
                        .where(eq(recordsTable.recordId, Number(data.recordId)))
                        .returning()
                );
            if (recordUpdateError) {
                throw new HTTPException(500, {
                    message: "Error while updating record",
                    cause: recordUpdateError,
                });
            }
            return c.json({ record: recordDUpdateResult[0] }, 200);
        }
    );
