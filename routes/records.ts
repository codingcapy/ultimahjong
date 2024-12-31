import { Hono } from "hono";

export const recordsRoute = new Hono()
  .post("/", (c) => {
    return c.json({ success: true });
  })
  .get("/:game_id");
