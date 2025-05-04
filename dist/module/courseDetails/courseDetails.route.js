"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const courseDetails_validation_1 = require("./courseDetails.validation");
const courseDetails_controller_1 = require("./courseDetails.controller");
const courseDetailsRouter = (0, express_1.Router)();
courseDetailsRouter.post("/create-course-details", (0, validateRequest_1.default)(courseDetails_validation_1.courseDetailsValidation.createCourseDetailsZodSchema), courseDetails_controller_1.courseDetailsController.createCourseDetails);
courseDetailsRouter.patch("/:id", (0, validateRequest_1.default)(courseDetails_validation_1.courseDetailsValidation.updateCourseDetailsZodSchema), courseDetails_controller_1.courseDetailsController.updateCourseDetails);
courseDetailsRouter.delete("/:id", courseDetails_controller_1.courseDetailsController.deleteCourseDetails);
courseDetailsRouter.get("/", courseDetails_controller_1.courseDetailsController.getAllCourseDetails);
courseDetailsRouter.get("/:courseId", courseDetails_controller_1.courseDetailsController.getSingleCourseDetails);
exports.default = courseDetailsRouter;
