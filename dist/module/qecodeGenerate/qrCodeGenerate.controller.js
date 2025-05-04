"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeController = void 0;
const qrCodeGenerate_service_1 = require("./qrCodeGenerate.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const generateQrCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    if (!studentId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Student ID Requierd");
    }
    const result = yield qrCodeGenerate_service_1.qrCodeService.generateQrCodeForStudent(studentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "  Qr Code Generate successfully",
        data: result,
    });
}));
const getAllQrcode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield qrCodeGenerate_service_1.qrCodeService.getQrCode(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Qr Code get successfully",
        data: result,
    });
}));
const deleteQrcode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield qrCodeGenerate_service_1.qrCodeService.deleteQrCode(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Qr Code deleted successfully",
        data: result,
    });
}));
const getSingleQrcode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield qrCodeGenerate_service_1.qrCodeService.getSingleQrCode(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Qr Code get successfully",
        data: result,
    });
}));
exports.qrCodeController = {
    generateQrCode,
    getAllQrcode,
    deleteQrcode,
    getSingleQrcode,
};
