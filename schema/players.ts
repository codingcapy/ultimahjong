import {
    pgTable,
    varchar,
    timestamp,
    serial,
    boolean,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const players = pgTable("players", {
    playerId: serial("player_id").primaryKey(),
    username: varchar("username").notNull(),
    active: boolean("active").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Player = InferSelectModel<typeof players>;
