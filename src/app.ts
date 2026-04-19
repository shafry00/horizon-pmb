import express from "express";
import cors from "cors";
import path from "path";
import uploadRoutes from "./routes/upload.route";
import { APP_CONFIG } from "./config/app.config";
import { logger } from "./libs/logger";
import morgan from "morgan";

const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

app.use(
  cors({
    origin: APP_CONFIG.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(APP_CONFIG.STATIC_ROUTE, express.static(APP_CONFIG.UPLOAD_PATH));

app.use("/api", uploadRoutes);

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send("📦 Welcome to the Horizon API");
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        APP_CONFIG.CORS_ORIGIN.includes("*") ||
        APP_CONFIG.CORS_ORIGIN.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

export default app;
