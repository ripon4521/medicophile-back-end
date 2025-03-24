import { Router } from "express";
import { coursCategoryController } from "./courseCategory.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseCategoryValidation } from "./courseCategory.validation";

const courseCategoryRoute = Router();

courseCategoryRoute.post(
  "/",
  validateRequest(courseCategoryValidation.createCourseCategorySchema),
  coursCategoryController.createCourseCategory
);

courseCategoryRoute.get('/', coursCategoryController.getAllCourseCategory);

export default courseCategoryRoute;