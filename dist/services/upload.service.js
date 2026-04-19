"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedFile = exports.handleFileUpload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../libs/logger");
const handleFileUpload = (file, baseUrl) => {
    const relativePath = `/uploads/${file.filename}`;
    const result = {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filename: file.filename,
        path: relativePath,
        ...(baseUrl && { url: `${baseUrl}${relativePath}` }),
    };
    logger_1.logger.info(`📥 File handled: ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);
    return result;
};
exports.handleFileUpload = handleFileUpload;
const deleteUploadedFile = (filename) => {
    const filePath = path_1.default.resolve("public/uploads", filename);
    return new Promise((resolve) => {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                logger_1.logger.error(`❌ Failed to delete file "${filename}": ${err.message}`);
                resolve(false);
            }
            else {
                logger_1.logger.info(`🗑️ File deleted: ${filename}`);
                resolve(true);
            }
        });
    });
};
exports.deleteUploadedFile = deleteUploadedFile;
