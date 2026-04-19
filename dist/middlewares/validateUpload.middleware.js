"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_middleware_1 = require("./multer.middleware");
const logger_1 = require("../libs/logger");
const validateUpload = (schema, fileFieldName = "file") => {
    return [
        multer_middleware_1.upload.single(fileFieldName),
        (req, res, next) => {
            try {
                const data = {
                    ...req.body,
                    ...(req.file ? { file: req.file } : {}),
                };
                schema.parse(data);
                logger_1.logger.info(`✅ Validasi upload berhasil: ${req.file?.originalname ?? "no file"}`);
                next();
            }
            catch (err) {
                if (req.file?.path) {
                    fs_1.default.unlink(req.file.path, () => { });
                    logger_1.logger.warn(`🗑️ File dihapus karena gagal validasi: ${req.file.filename}`);
                }
                logger_1.logger.warn(`❌ Validasi upload gagal: ${err?.errors?.[0]?.message || err.message}`);
                res.status(400).json({
                    success: false,
                    message: "Validasi gagal",
                    errors: err.errors ?? err.message,
                });
            }
        },
    ];
};
exports.validateUpload = validateUpload;
