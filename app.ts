import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { usersRoute } from "./routes/users";
import { userRoute } from "./routes/user";

const app = new Hono();

app.use("*", logger());

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ root: "./frontend/dist/index.html" }));

app.use("*", cors());

app.get("/", (c) => {
  c.status(200);
  return c.newResponse("welcome");
});

const apiRoutes = app
  .basePath("/api")
  .route("/users", usersRoute)
  .route("/user", userRoute);

export default app;