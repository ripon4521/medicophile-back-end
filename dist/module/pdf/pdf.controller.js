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
exports.uploadPdf = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pdf_service_1 = require("./pdf.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
exports.uploadPdf = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
      return res
        .status(http_status_1.default.BAD_REQUEST)
        .json({ message: "No PDF file uploaded" });
    }
    const result = yield (0, pdf_service_1.uploadPdfService)(file);
    res.status(http_status_1.default.OK).json({
      success: true,
      message: "PDF uploaded successfully",
      data: result,
    });
  }),
);
