"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyApiKey = void 0;
const app_config_1 = require("../config/app.config");
const logger_1 = require("../libs/logger");
const verifyApiKey = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
        logger_1.logger.warn(`🛑 API key missing from request (IP: ${req.ip})`);
        res.status(403).json({
            success: false,
            message: "Forbidden: API key is required",
        });
        return;
    }
    if (apiKey !== app_config_1.APP_CONFIG.API_KEY) {
        logger_1.logger.warn(`🚫 Invalid API key used (IP: ${req.ip}, Key: ${apiKey})`);
        res.status(403).json({
            success: false,
            message: "Forbidden: Invalid API Key",
        });
        return;
    }
    logger_1.logger.info(`✅ Valid API key from IP: ${req.ip}`);
    next();
};
exports.verifyApiKey = verifyApiKey;
