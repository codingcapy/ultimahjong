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
app.use(
    "*",
    cors({
        origin: (origin) => {
            // Allow requests from your local dev and production frontend
            const allowedOrigins = [
                "http://localhost:5173",
                "https://ultimahjong-production-3fbe.up.railway.app",
            ];
            return origin && allowedOrigins.includes(origin) ? origin : "";
        },
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

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

export type ApiRoutes = typeof apiRoutes;
export default app;
