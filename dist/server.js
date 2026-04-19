"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./config/app.config");
const logger_1 = require("./libs/logger");
const PORT = app_config_1.APP_CONFIG.PORT;
app_1.default.listen(app_config_1.APP_CONFIG.PORT, () => {
    logger_1.logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
