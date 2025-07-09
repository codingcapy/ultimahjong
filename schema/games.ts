import {
    pgTable,
    varchar,
    timestamp,
    serial,
    boolean,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const games = pgTable("games", {
    gameId: serial("game_id").primaryKey(),
    year: varchar("year"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    active: boolean("active").default(true),
});

export type Game = InferSelectModel<typeof games>;
