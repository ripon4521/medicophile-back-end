"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrCodeGenerate_controller_1 = require("./qrCodeGenerate.controller");
const auth_1 = require("../../middlewares/auth");
const qrCodeGenerateRoute = express_1.default.Router();
qrCodeGenerateRoute.post("/generate-qr", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), qrCodeGenerate_controller_1.qrCodeController.generateQrCode);
qrCodeGenerateRoute.get("/", qrCodeGenerate_controller_1.qrCodeController.getAllQrcode);
qrCodeGenerateRoute.delete("/:id", qrCodeGenerate_controller_1.qrCodeController.deleteQrcode);
qrCodeGenerateRoute.get("/:id", qrCodeGenerate_controller_1.qrCodeController.getSingleQrcode);
exports.default = qrCodeGenerateRoute;
