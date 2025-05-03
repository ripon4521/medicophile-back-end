import express from "express";
import { qrCodeController } from "./qrCodeGenerate.controller";


const qrCodeGenerateRoute = express.Router();

qrCodeGenerateRoute.post("/generate-qr", qrCodeController.generateQrCode);
qrCodeGenerateRoute.get("/", qrCodeController.getAllQrcode);
qrCodeGenerateRoute.delete("/:id", qrCodeController.deleteQrcode);
qrCodeGenerateRoute.get('/:id', qrCodeController.getSingleQrcode)

export default qrCodeGenerateRoute;
