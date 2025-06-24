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
const path_1 = __importDefault(require("path"));
const sendToCloudinary = (fileName, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const fileNameWithoutExt = fileName.replace(path_1.default.extname(fileName), "");
        cloudinary_1.v2.uploader.upload(filePath, {
            public_id: fileNameWithoutExt,
            resource_type: "raw", // ⬅️ important for PDF and other non-image files
        }, (err, result) => {
            if (err || !result) {
                return reject(new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "File cannot be uploaded to Cloudinary", (err === null || err === void 0 ? void 0 : err.name) || "CloudinaryUploadError"));
            }
            resolve(result);
        });
    });
});
exports.sendToCloudinary = sendToCloudinary;
