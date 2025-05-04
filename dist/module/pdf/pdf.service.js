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
exports.uploadPdfService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendPdfToCloudnery_1 = require("../../utils/sendPdfToCloudnery");
const uploadPdfService = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(file.destination, file.filename);
    // ✅ Extension ছাড়া নাম
    const pdfName = path_1.default.parse(file.filename).name;
    const result = yield (0, sendPdfToCloudnery_1.sendToCloudinary)(pdfName, filePath);
    // ✅ লোকাল ফাইল রিমুভ
    fs_1.default.unlinkSync(filePath);
    return result;
});
exports.uploadPdfService = uploadPdfService;
