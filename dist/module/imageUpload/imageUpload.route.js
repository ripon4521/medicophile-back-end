"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUploadMiddleware_1 = require("./imageUploadMiddleware");
const imageUpload_controller_1 = require("./imageUpload.controller");
const imageUploadRouter = express_1.default.Router();
imageUploadRouter.post(
  "/upload",
  imageUploadMiddleware_1.singleImageUpload,
  imageUpload_controller_1.uploadImage,
);
exports.default = imageUploadRouter;
