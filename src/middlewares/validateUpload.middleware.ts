import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import fs from "fs";
import { upload } from "./multer.middleware";
import { logger } from "../libs/logger";

export const validateUpload = (schema: ZodSchema, fileFieldName = "file") => {
  return [
    upload.single(fileFieldName),

    (req: Request, res: Response, next: NextFunction): void => {
      try {
        const data = {
          ...req.body,
          ...(req.file ? { file: req.file } : {}),
        };

        schema.parse(data);

        logger.info(
          `✅ Validasi upload berhasil: ${req.file?.originalname ?? "no file"}`
        );

        next();
      } catch (err: any) {
        if (req.file?.path) {
          fs.unlink(req.file.path, () => {});
          logger.warn(
            `🗑️ File dihapus karena gagal validasi: ${req.file.filename}`
          );
        }

        logger.warn(
          `❌ Validasi upload gagal: ${err?.errors?.[0]?.message || err.message}`
        );

        res.status(400).json({
          success: false,
          message: "Validasi gagal",
          errors: err.errors ?? err.message,
        });
      }
    },
  ];
};
