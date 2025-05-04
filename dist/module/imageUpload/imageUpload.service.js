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
exports.uploadImageService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendImageToCloudnery_1 = require("../../utils/sendImageToCloudnery");
const uploadImageService = (file) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join(file.destination, file.filename);
    // ✅ Extension ছাড়া ফাইলনেম
    const imageName = path_1.default.parse(file.filename).name;
    const result = yield (0, sendImageToCloudnery_1.sendImageToCloudinary)(
      imageName,
      imagePath,
    );
    // ✅ লোকাল ফাইল ডিলিট
    fs_1.default.unlinkSync(imagePath);
    return result;
  });
exports.uploadImageService = uploadImageService;
