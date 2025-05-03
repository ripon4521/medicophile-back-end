"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrCodeGenerate_controller_1 = require("./qrCodeGenerate.controller");
const qrCodeGenerateRoute = express_1.default.Router();
qrCodeGenerateRoute.post("/generate-qr", qrCodeGenerate_controller_1.qrCodeController.generateQrCode);
qrCodeGenerateRoute.get("/", qrCodeGenerate_controller_1.qrCodeController.getAllQrcode);
qrCodeGenerateRoute.delete("/:id", qrCodeGenerate_controller_1.qrCodeController.deleteQrcode);
exports.default = qrCodeGenerateRoute;
