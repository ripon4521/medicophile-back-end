"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseCategory_controller_1 = require("./courseCategory.controller");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const courseCategory_validation_1 = require("./courseCategory.validation");
const courseCategoryRoute = (0, express_1.Router)();
courseCategoryRoute.post(
  "/",
  (0, validateRequest_1.default)(
    courseCategory_validation_1.courseCategoryValidation
      .createCourseCategorySchema,
  ),
  courseCategory_controller_1.coursCategoryController.createCourseCategory,
);
courseCategoryRoute.get(
  "/",
  courseCategory_controller_1.coursCategoryController.getAllCourseCategory,
);
courseCategoryRoute.get(
  "/:slug",
  courseCategory_controller_1.coursCategoryController.getSingleCourseCategory,
);
courseCategoryRoute.patch(
  "/:slug",
  (0, validateRequest_1.default)(
    courseCategory_validation_1.courseCategoryValidation
      .updateCourseCategorySchema,
  ),
  courseCategory_controller_1.coursCategoryController.updateCourseCategory,
);
courseCategoryRoute.delete(
  "/:slug",
  courseCategory_controller_1.coursCategoryController.deletdCourseCategory,
);
exports.default = courseCategoryRoute;
