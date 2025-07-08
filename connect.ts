import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import {
    pgTable,
    varchar,
    serial,
    integer,
    boolean,
} from "drizzle-orm/pg-core";
import dotenv from "dotenv";

dotenv.config();

const Pool = pg.Pool;

export const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING,
});

export const db = drizzle(pool);

export const users = pgTable("users", {
    user_id: varchar("user_id").primaryKey(),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
    created_at: varchar("created_at").notNull(),
});

export const games = pgTable("games", {
    game_id: serial("game_id").primaryKey(),
    year: varchar("year"),
    created_at: varchar("created_at"),
    active: boolean("active").default(true),
});

export const records = pgTable("records", {
    record_id: serial("record_id").primaryKey(),
    game_id: integer("game_id"),
    winner: varchar("winner"),
    loser: varchar("loser"),
    points: integer("points"),
    created_at: varchar("created_at"),
    active: boolean("active").default(true),
});
