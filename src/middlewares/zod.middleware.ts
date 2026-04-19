import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import fs from "fs";
import { logger } from "../libs/logger";

export const validate =
  (schema: ZodSchema, source: "body" | "query" | "params" | "file" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data =
        source === "file" ? { file: req.file } : (req as any)[source];

      schema.parse(data);

      logger.info(
        `✅ Zod validation passed for ${source.toUpperCase()}${
          source === "file" && req.file ? `: ${req.file.originalname}` : ""
        }`
      );

      next();
    } catch (err: any) {
      if (source === "file" && req.file?.path) {
        fs.unlink(req.file.path, () => {});
        logger.warn(
          `🗑️ Invalid file deleted due to validation error: ${req.file.filename}`
        );
      }

      logger.warn(
        `❌ Zod validation failed on ${source.toUpperCase()} — ${err?.errors?.[0]?.message || err.message}`
      );

      res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: err.errors ?? err.message,
      });
    }
  };
