import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export const APP_CONFIG = {
  PORT: process.env.PORT || 3000,
  UPLOAD_PATH: path.resolve(process.env.UPLOAD_DIR || "public/uploads"),
  STATIC_ROUTE: "/uploads",
  CORS_ORIGIN: (process.env.CORS_ORIGIN || "*")
    .split(",")
    .map((origin) => origin.trim()),
  API_KEY: process.env.API_KEY || "",
};
