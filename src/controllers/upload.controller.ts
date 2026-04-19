import { NextFunction, Request, Response } from "express";
import {
  deleteUploadedFile,
  handleFileUpload,
} from "../services/upload.service";
import { logger } from "../libs/logger";

export const uploadFile = (req: Request, res: Response): void => {
  if (!req.file) {
    logger.warn("📥 Upload failed: no file attached");
    res.status(400).json({ success: false, message: "No file uploaded" });
    return;
  }

  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileData = handleFileUpload(req.file, baseUrl);

    logger.info(
      `✅ File uploaded: ${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`
    );

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: fileData,
    });
  } catch (err: any) {
    logger.error(`❌ Error after upload: ${err.message}`);

    if (req.file?.filename) {
      deleteUploadedFile(req.file.filename);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteFile = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { filename } = req.params;

  if (!filename) {
    logger.warn("🛑 Delete request without filename");
    res.status(400).json({
      success: false,
      message: "Filename is required",
    });
    return;
  }

  logger.info(`🗑️ Manual delete requested for: ${filename}`);

  const deleted = await deleteUploadedFile(filename);

  if (deleted) {
    res.status(200).json({
      success: true,
      message: `File ${filename} deleted successfully.`,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `File ${filename} not found or already deleted.`,
    });
  }
};
