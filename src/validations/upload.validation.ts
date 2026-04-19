import { z } from "zod";

export const uploadSchema = z.object({
  file: z.custom<Express.Multer.File>(
    (val) => {
      if (!val || typeof val !== "object") return false;

      const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      return allowedMimeTypes.includes((val as Express.Multer.File).mimetype);
    },
    {
      message: "Hanya file PDF, DOC, atau DOCX yang diperbolehkan",
    }
  ),
});

export type UploadInput = z.infer<typeof uploadSchema>;
