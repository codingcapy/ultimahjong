import { Hono } from "hono";
import { players as playersTable } from "../schema/players";

export const playersRoute = new Hono();
