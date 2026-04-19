"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSchema = void 0;
const zod_1 = require("zod");
exports.uploadSchema = zod_1.z.object({
    file: zod_1.z.custom((val) => {
        if (!val || typeof val !== "object")
            return false;
        const allowedMimeTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return allowedMimeTypes.includes(val.mimetype);
    }, {
        message: "Hanya file PDF, DOC, atau DOCX yang diperbolehkan",
    }),
});
