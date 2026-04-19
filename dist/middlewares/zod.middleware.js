"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../libs/logger");
const validate = (schema, source = "body") => (req, res, next) => {
    try {
        const data = source === "file" ? { file: req.file } : req[source];
        schema.parse(data);
        logger_1.logger.info(`✅ Zod validation passed for ${source.toUpperCase()}${source === "file" && req.file ? `: ${req.file.originalname}` : ""}`);
        next();
    }
    catch (err) {
        if (source === "file" && req.file?.path) {
            fs_1.default.unlink(req.file.path, () => { });
            logger_1.logger.warn(`🗑️ Invalid file deleted due to validation error: ${req.file.filename}`);
        }
        logger_1.logger.warn(`❌ Zod validation failed on ${source.toUpperCase()} — ${err?.errors?.[0]?.message || err.message}`);
        res.status(400).json({
            success: false,
            message: "Validasi gagal",
            errors: err.errors ?? err.message,
        });
    }
};
exports.validate = validate;
