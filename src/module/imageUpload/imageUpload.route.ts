import express from "express";
import { singleImageUpload } from "./imageUploadMiddleware";
import { uploadImage } from "./imageUpload.controller";

const imageUploadRouter = express.Router();

imageUploadRouter.post("/upload", singleImageUpload, uploadImage);

export default imageUploadRouter;
