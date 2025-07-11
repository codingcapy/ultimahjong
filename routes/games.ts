import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../connect";
import { games as gamesTable } from "../schema/games";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { mightFail } from "might-fail";
import { HTTPException } from "hono/http-exception";

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

const updateGameSchema = gameSchema.omit({
    game_id: true,
    created_at: true,
    active: true,
});

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
    .patch("/:game_id", zValidator("json", createGameSchema), async (c) => {
        console.log("function running");
        try {
            const game_id = Number.parseInt(c.req.param("game_id"));
            const data = c.req.valid("json");
            const game = updateGameSchema.parse(data);
            await db
                .update(gamesTable)
                .set({
                    year: game.year,
                })
                .where(eq(gamesTable.gameId, game_id));
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
