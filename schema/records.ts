import {
    pgTable,
    varchar,
    timestamp,
    serial,
    boolean,
    integer,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const records = pgTable("records", {
    recordId: serial("record_id").primaryKey(),
    gameId: integer("game_id"),
    winner: varchar("winner"),
    loser: varchar("loser"),
    points: integer("points"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    active: boolean("active").default(true),
});

export type Record = InferSelectModel<typeof records>;
