"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const app_config_1 = require("./config/app.config");
const logger_1 = require("./libs/logger");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined", {
    stream: {
        write: (message) => logger_1.logger.http(message.trim()),
    },
}));
app.use((0, cors_1.default)({
    origin: app_config_1.APP_CONFIG.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(app_config_1.APP_CONFIG.STATIC_ROUTE, express_1.default.static(app_config_1.APP_CONFIG.UPLOAD_PATH));
app.use("/api", upload_route_1.default);
app.use((err, _req, res, _next) => {
    logger_1.logger.error(`❌ Global error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
exports.default = app;
