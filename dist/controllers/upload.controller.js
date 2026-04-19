"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const upload_service_1 = require("../services/upload.service");
const logger_1 = require("../libs/logger");
const uploadFile = (req, res) => {
    if (!req.file) {
        logger_1.logger.warn("📥 Upload failed: no file attached");
        res.status(400).json({ success: false, message: "No file uploaded" });
        return;
    }
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const fileData = (0, upload_service_1.handleFileUpload)(req.file, baseUrl);
        logger_1.logger.info(`✅ File uploaded: ${req.file.originalname} (${req.file.mimetype}, ${req.file.size} bytes)`);
        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: fileData,
        });
    }
    catch (err) {
        logger_1.logger.error(`❌ Error after upload: ${err.message}`);
        if (req.file?.filename) {
            (0, upload_service_1.deleteUploadedFile)(req.file.filename);
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.uploadFile = uploadFile;
const deleteFile = async (req, res, _next) => {
    const { filename } = req.params;
    if (!filename) {
        logger_1.logger.warn("🛑 Delete request without filename");
        res.status(400).json({
            success: false,
            message: "Filename is required",
        });
        return;
    }
    logger_1.logger.info(`🗑️ Manual delete requested for: ${filename}`);
    const deleted = await (0, upload_service_1.deleteUploadedFile)(filename);
    if (deleted) {
        res.status(200).json({
            success: true,
            message: `File ${filename} deleted successfully.`,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: `File ${filename} not found or already deleted.`,
        });
    }
};
exports.deleteFile = deleteFile;
