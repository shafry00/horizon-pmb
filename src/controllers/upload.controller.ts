import { Context } from "hono";
import { deleteUploadedFile, handleFileUpload } from "../services/upload.service";

export const uploadFile = async (c: Context) => {
  const formData = await c.req.parseFormData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return c.json({ success: false, message: "No file uploaded" }, 400);
  }

  try {
    const baseUrl = c.req.header("host") || "";
    const fileData = handleFileUpload(file, baseUrl);

    return c.json({
      success: true,
      message: "File uploaded successfully",
      data: fileData,
    });
  } catch (err: any) {
    return c.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      500
    );
  }
};

export const deleteFile = async (c: Context) => {
  const { filename } = c.req.param();

  if (!filename) {
    return c.json(
      {
        success: false,
        message: "Filename is required",
      },
      400
    );
  }

  const deleted = await deleteUploadedFile(filename);

  if (deleted) {
    return c.json({
      success: true,
      message: `File ${filename} deleted successfully.`,
    });
  } else {
    return c.json(
      {
        success: false,
        message: `File ${filename} not found or already deleted.`,
      },
      404
    );
  }
};