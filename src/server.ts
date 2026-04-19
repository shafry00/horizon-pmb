import app from "./app";
import { APP_CONFIG } from "./config/app.config";
import { logger } from "./libs/logger";

const PORT = APP_CONFIG.PORT;

app.listen(APP_CONFIG.PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
