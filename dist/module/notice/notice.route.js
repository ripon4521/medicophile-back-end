"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const notice_validation_1 = require("./notice.validation");
const notice_controller_1 = require("./notice.controller");
const noticeRoute = (0, express_1.Router)();
noticeRoute.post("/create-notice", (0, validateRequest_1.default)(notice_validation_1.noticeValidation.createNoticeSchema), notice_controller_1.noticeController.createNotice);
noticeRoute.get("/", notice_controller_1.noticeController.getAllNotice);
noticeRoute.get("/:slug", notice_controller_1.noticeController.getSingleNotice);
noticeRoute.patch("/:slug", (0, validateRequest_1.default)(notice_validation_1.noticeValidation.updateNoticeSchema), notice_controller_1.noticeController.updateNotice);
noticeRoute.delete("/:slug", notice_controller_1.noticeController.deleteNotice);
exports.default = noticeRoute;
