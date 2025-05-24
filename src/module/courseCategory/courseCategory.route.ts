import { Router } from "express";
import { coursCategoryController } from "./courseCategory.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseCategoryValidation } from "./courseCategory.validation";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const courseCategoryRoute = Router();

courseCategoryRoute.post(
  "/",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(courseCategoryValidation.createCourseCategorySchema),
  coursCategoryController.createCourseCategory,
);

courseCategoryRoute.get("/", coursCategoryController.getAllCourseCategory);
courseCategoryRoute.get(
  "/:slug",
  coursCategoryController.getSingleCourseCategory,
);
courseCategoryRoute.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(courseCategoryValidation.updateCourseCategorySchema),
  coursCategoryController.updateCourseCategory,
);

courseCategoryRoute.delete(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin") , 
  coursCategoryController.deletdCourseCategory,
);

export default courseCategoryRoute;
