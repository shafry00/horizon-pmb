import path from "path";
import fs from "fs";
import { UploadedFile } from "../models/UploadedFile";
import { logger } from "../libs/logger";

export const handleFileUpload = (
  file: Express.Multer.File,
  baseUrl?: string
): UploadedFile & { url?: string } => {
  const relativePath = `/uploads/${file.filename}`;

  const result = {
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    filename: file.filename,
    path: relativePath,
    ...(baseUrl && { url: `${baseUrl}${relativePath}` }),
  };

  logger.info(
    `📥 File handled: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`
  );

  return result;
};

export const deleteUploadedFile = (filename: string): Promise<boolean> => {
  const filePath = path.resolve("public/uploads", filename);

  return new Promise((resolve) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        logger.error(`❌ Failed to delete file "${filename}": ${err.message}`);
        resolve(false);
      } else {
        logger.info(`🗑️ File deleted: ${filename}`);
        resolve(true);
      }
    });
  });
};
