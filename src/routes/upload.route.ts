import { Hono } from "hono";
import { deleteFile, uploadFile } from "../controllers/upload.controller";

const uploadRoutes = new Hono();

uploadRoutes.post("/upload", uploadFile);

uploadRoutes.delete("/upload/:filename", deleteFile);

export default uploadRoutes;