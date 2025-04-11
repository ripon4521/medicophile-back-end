"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdf_middleware_1 = require("./pdf.middleware");
const pdf_controller_1 = require("./pdf.controller");
const pdfRouter = express_1.default.Router();
pdfRouter.post(
  "/upload",
  pdf_middleware_1.uploadPdf,
  pdf_controller_1.uploadPdf,
);
exports.default = pdfRouter;
