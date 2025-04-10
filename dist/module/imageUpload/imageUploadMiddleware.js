"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleImageUpload = void 0;
const sendImageToCloudnery_1 = require("../../utils/sendImageToCloudnery");
exports.singleImageUpload = sendImageToCloudnery_1.upload.single('image');
