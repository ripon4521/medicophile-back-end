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

courseCategoryRoute.get("/", coursCategoryController.getAllCourseCategory);
courseCategoryRoute.get(
  "/:slug",
  coursCategoryController.getSingleCourseCategory
);
courseCategoryRoute.patch(
  "/:slug",
  validateRequest(courseCategoryValidation.updateCourseCategorySchema),
  coursCategoryController.updateCourseCategory
);

courseCategoryRoute.delete('/:slug', coursCategoryController.deletdCourseCategory)

export default courseCategoryRoute;
