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
exports.qrCodeService = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const purchase_model_1 = require("../purchase/purchase.model");
const qrCodeGenerate_model_1 = __importDefault(require("./qrCodeGenerate.model"));
const batchStudent_model_1 = require("../batchStudent/batchStudent.model");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const generateQrCodeForStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield purchase_model_1.PurchaseModel.findOne({ studentId });
    if (!student) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Student not found in purchase");
    }
    const batchStudent = yield batchStudent_model_1.BatchStudentModel.findOne({ studentId });
    if (!batchStudent) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Student not admitted in batch");
    }
    const qrData = student._id.toString();
    const qrImage = yield qrcode_1.default.toDataURL(qrData);
    const result = yield qrCodeGenerate_model_1.default.create({ qrCode: qrImage });
    return result;
});
const getQrCode = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(qrCodeGenerate_model_1.default, query)
        .search(["qrCode"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "_id",
            select: "name role phone profile_picture",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const deleteQrCode = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield qrCodeGenerate_model_1.default.findOneAndDelete({ _id });
    return result;
});
exports.qrCodeService = {
    generateQrCodeForStudent,
    getQrCode,
    deleteQrCode
};
