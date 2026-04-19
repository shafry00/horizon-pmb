import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { deleteFile, uploadFile } from "../controllers/upload.controller";
import { verifyApiKey } from "../middlewares/apiKey.middleware";
import { uploadSchema } from "../validations/upload.validation";
import { validate } from "../middlewares/zod.middleware";
import { validateUpload } from "../middlewares/validateUpload.middleware";

const router = Router();

router.post(
  "/upload",
  verifyApiKey,
  ...validateUpload(uploadSchema, "file"),
  uploadFile
);

router.delete("/upload/:filename", verifyApiKey, deleteFile);

export default router;
