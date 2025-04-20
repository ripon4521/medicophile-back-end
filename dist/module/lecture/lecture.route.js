"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const lecture_validation_1 = require("./lecture.validation");
const lecture_controller_1 = require("./lecture.controller");
const lectureRouter = (0, express_1.Router)();
lectureRouter.post("/create-lecture", (0, validateRequest_1.default)(lecture_validation_1.lectureValidation.createLectureSchema), lecture_controller_1.lectureController.createLecture);
lectureRouter.patch("/:slug", (0, validateRequest_1.default)(lecture_validation_1.lectureValidation.updateLectureSchema), lecture_controller_1.lectureController.updateLecture);
lectureRouter.get("/", lecture_controller_1.lectureController.getLecture);
lectureRouter.get("/:id", lecture_controller_1.lectureController.getSpeecificLecture);
lectureRouter.get("/:slug", lecture_controller_1.lectureController.getSingleLecture);
lectureRouter.delete("/:slug", lecture_controller_1.lectureController.deleteLecture);
exports.default = lectureRouter;
