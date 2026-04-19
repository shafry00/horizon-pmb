import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { uploadFile, deleteFile } from "./routes/upload.route";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "x-api-key"],
  })
);

app.get("/", (c) => c.text("📦 Welcome to the Horizon API"));

app.route("/api", uploadFile);

app.notFound((c) => c.json({ success: false, message: "Not Found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ success: false, message: "Internal Server Error" }, 500);
});

export default app;