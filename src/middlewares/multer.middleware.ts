import multer from "multer";
import { logger } from "../libs/logger";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = "public/uploads";

    cb(null, destPath);
    logger.info(
      `📂 Multer destination resolved for file: ${file.originalname}`
    );
  },

  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
    logger.info(`📝 Multer generated filename: ${uniqueName}`);
  },
});

export const upload = multer({ storage });
