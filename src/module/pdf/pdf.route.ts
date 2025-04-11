import express from "express";

import { uploadPdf as pdfMiddleware } from "./pdf.middleware";
import { uploadPdf } from "./pdf.controller";

const pdfRouter = express.Router();

pdfRouter.post("/upload", pdfMiddleware, uploadPdf);

export default pdfRouter;
