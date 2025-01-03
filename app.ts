import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { usersRoute } from "./routes/users";
import { userRoute } from "./routes/user";
import { gamesRoute } from "./routes/games";
import { recordsRoute } from "./routes/records";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

// API routes
const apiRoutes = app
    .basePath("/api")
    .route("/users", usersRoute)
    .route("/user", userRoute)
    .route("/games", gamesRoute)
    .route("/records", recordsRoute);

// Serve static assets (CSS, JS, images, etc.)
app.use("/*", serveStatic({ root: "./frontend/dist" }));

// Serve `index.html` for non-API routes
app.get("/*", async (c) => {
    try {
        const indexHtml = await Bun.file("./frontend/dist/index.html").text();
        return c.html(indexHtml);
    } catch (error) {
        console.error("Error reading index.html:", error);
        return c.text("Internal Server Error", 500);
    }
});

export default app;
