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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../helpers/AppError"));
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename: image } = req.file;
    const outputPath = path_1.default.resolve((req === null || req === void 0 ? void 0 : req.file).destination, `resized-${image}`);
    yield (0, sharp_1.default)((req === null || req === void 0 ? void 0 : req.file).path)
        .resize(400, 400)
        .jpeg({ quality: 50 })
        .toFile(outputPath)
        .catch(err => new AppError_1.default(http_status_1.default.BAD_REQUEST, err === null || err === void 0 ? void 0 : err.message));
    next();
});
exports.default = resizeImage;
