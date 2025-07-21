import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../connect";
import { games as gamesTable } from "../schema/games";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { mightFail } from "might-fail";
import { HTTPException } from "hono/http-exception";

export const gamesRoute = new Hono()
    .post(
        "/",
        zValidator(
            "json",
            createInsertSchema(gamesTable).omit({
                gameId: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            const { error: gameInsertError, result: gameInsertResult } =
                await mightFail(
                    db
                        .insert(gamesTable)
                        .values({
                            year: data.year,
                            active: true,
                        })
                        .returning()
                );
            if (gameInsertError) {
                console.log("Error while creating game");
                throw new HTTPException(500, {
                    message: "Error while creating game",
                    cause: gameInsertError,
                });
            }
            return c.json({ game: gameInsertResult[0] }, 200);
        }
    )
    .post(
        "/update",
        zValidator(
            "json",
            createInsertSchema(gamesTable).omit({
                active: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            const { error: gameUpdateError, result: gameDUpdateResult } =
                await mightFail(
                    await db
                        .update(gamesTable)
                        .set({
                            year: data.year,
                        })
                        .where(eq(gamesTable.gameId, Number(data.gameId)))
                        .returning()
                );
            if (gameUpdateError) {
                console.log("Error while creating user");
                throw new HTTPException(500, {
                    message: "Error while updating user",
                    cause: gameUpdateError,
                });
            }
            return c.json({ game: gameDUpdateResult[0] }, 200);
        }
    )
    .post(
        "/delete",
        zValidator(
            "json",
            createInsertSchema(gamesTable).omit({
                year: true,
                active: true,
                createdAt: true,
            })
        ),
        async (c) => {
            const data = c.req.valid("json");
            const { error: gameDeleteError, result: gameDeleteResult } =
                await mightFail(
                    await db
                        .update(gamesTable)
                        .set({
                            active: false,
                        })
                        .where(eq(gamesTable.gameId, Number(data.gameId)))
                        .returning()
                );
            if (gameDeleteError) {
                console.log("Error while creating user");
                throw new HTTPException(500, {
                    message: "Error while creating user",
                    cause: gameDeleteError,
                });
            }
            return c.json({ game: gameDeleteResult[0] }, 200);
        }
    )
    .get("/", async (c) => {
        const { result: gamesQueryResult, error: gamesQueryError } =
            await mightFail(db.select().from(gamesTable));
        if (gamesQueryError) {
            throw new HTTPException(500, {
                message: "Error occurred when fetching games.",
                cause: gamesQueryError,
            });
        }
        return c.json({ games: gamesQueryResult });
    });
