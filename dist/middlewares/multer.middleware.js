"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const logger_1 = require("../libs/logger");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const destPath = "public/uploads";
        cb(null, destPath);
        logger_1.logger.info(`📂 Multer destination resolved for file: ${file.originalname}`);
    },
    filename: (_req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
        logger_1.logger.info(`📝 Multer generated filename: ${uniqueName}`);
    },
});
exports.upload = (0, multer_1.default)({ storage });
