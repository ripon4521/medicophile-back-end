"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const courseReview_validation_1 = require("./courseReview.validation");
const courseReview_controller_1 = require("./courseReview.controller");
const courseReveiewRouter = (0, express_1.Router)();
courseReveiewRouter.post(
  "/create-course-review",
  (0, validateRequest_1.default)(
    courseReview_validation_1.coursReviewValidation.createCourseReviewZodSchema,
  ),
  courseReview_controller_1.courseReveiwController.createCourseReveiw,
);
courseReveiewRouter.patch(
  "/:id",
  (0, validateRequest_1.default)(
    courseReview_validation_1.coursReviewValidation.updateCourseReviewZodSchema,
  ),
  courseReview_controller_1.courseReveiwController.updateCourseReview,
);
courseReveiewRouter.get(
  "/",
  courseReview_controller_1.courseReveiwController.getAllCourseReview,
);
courseReveiewRouter.get(
  "/:courseId",
  courseReview_controller_1.courseReveiwController.getSingleCourseReview,
);
courseReveiewRouter.delete(
  "/:id",
  courseReview_controller_1.courseReveiwController.deleteCourseReveiw,
);
exports.default = courseReveiewRouter;
