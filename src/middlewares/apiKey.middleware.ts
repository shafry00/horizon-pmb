import { Request, Response, NextFunction } from "express";
import { APP_CONFIG } from "../config/app.config";
import { logger } from "../libs/logger";

export const verifyApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    logger.warn(`🛑 API key missing from request (IP: ${req.ip})`);
    res.status(403).json({
      success: false,
      message: "Forbidden: API key is required",
    });
    return;
  }

  if (apiKey !== APP_CONFIG.API_KEY) {
    logger.warn(`🚫 Invalid API key used (IP: ${req.ip}, Key: ${apiKey})`);
    res.status(403).json({
      success: false,
      message: "Forbidden: Invalid API Key",
    });
    return;
  }

  logger.info(`✅ Valid API key from IP: ${req.ip}`);
  next();
};
