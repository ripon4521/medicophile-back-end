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
exports.sendToCloudinary = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const cloudinary_1 = require("cloudinary");
const path_1 = __importDefault(require("path")); // ⬅️ Add this
const sendToCloudinary = (fileName, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const fileNameWithoutExt = fileName.replace(path_1.default.extname(fileName), ''); // ✅ Remove extension
        cloudinary_1.v2.uploader.upload(filePath, {
            public_id: fileNameWithoutExt, // ✅ Prevents double extension
            resource_type: 'auto',
        }, (err, result) => {
            if (err) {
                reject(new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'File cannot upload', err === null || err === void 0 ? void 0 : err.name));
            }
            resolve(result);
        });
    });
});
exports.sendToCloudinary = sendToCloudinary;
