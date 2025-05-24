import express from "express";
import { qrCodeController } from "./qrCodeGenerate.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const qrCodeGenerateRoute = express.Router();

qrCodeGenerateRoute.post("/generate-qr", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , qrCodeController.generateQrCode);
qrCodeGenerateRoute.get("/", qrCodeController.getAllQrcode);
qrCodeGenerateRoute.delete("/:id", qrCodeController.deleteQrcode);
qrCodeGenerateRoute.get("/:id", qrCodeController.getSingleQrcode);

export default qrCodeGenerateRoute;
