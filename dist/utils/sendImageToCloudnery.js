"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const AppError_1 = __importDefault(require("../helpers/AppError"));
const config_1 = __importDefault(require("../config"));
// Cloudinary configuration
cloudinary_1.v2.config({
  cloud_name: config_1.default.cloudinaryCloudName || "dpy7b0pzi",
  api_key: config_1.default.cloudinaryApiKey || "744272462512389",
  api_secret:
    config_1.default.cloudinaryApiSecret || "qt4JkEurFxNa42MIwSJOnaImCxo",
  secure: true,
});
/**
 * Uploads image to Cloudinary
 * @param imageName Custom image name for Cloudinary
 * @param filePath Local path of the file to upload
 * @returns Cloudinary upload response
 */
const sendImageToCloudinary = (imageName, filePath) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield cloudinary_1.v2.uploader.upload(filePath, {
        public_id: imageName,
        transformation: {
          aspect_ratio: 1,
          width: 400,
          quality: 60,
          fetch_format: "auto",
        },
      });
      return result;
    } catch (error) {
      throw new AppError_1.default(
        http_status_1.default.CONFLICT,
        "Image upload failed to Cloudinary",
        error === null || error === void 0 ? void 0 : error.message,
      );
    }
  });
exports.sendImageToCloudinary = sendImageToCloudinary;
// Multer storage configuration
const storage = multer_1.default.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path_1.default.join(process.cwd(), "uploads"));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path_1.default.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
// Multer instance
exports.upload = (0, multer_1.default)({ storage });
