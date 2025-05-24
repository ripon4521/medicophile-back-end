import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookCategoryValidation } from "./bookCategory.validation";
import { bookCategoryontroller } from "./bookCategory.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const bookCategoryRoute = Router();
bookCategoryRoute.post(
  "/cretae-product-category",
  authUser("admin","superAdmin"),onlyAdminAndFacultyAndStudent("admin", "superAdmin"),
  validateRequest(bookCategoryValidation.createBookCategoryValidationSchema),
  bookCategoryontroller.createBookCategory,
);
bookCategoryRoute.get("/", bookCategoryontroller.getAllBookCategory);
bookCategoryRoute.get("/:slug", bookCategoryontroller.getSingleBookCategory);
bookCategoryRoute.patch(
  "/:slug",
   authUser("admin","superAdmin"),onlyAdminAndFacultyAndStudent("admin", "superAdmin"),
  validateRequest(bookCategoryValidation.updateBookCategoryValidationSchema),
  bookCategoryontroller.updateBookCategory,
);
bookCategoryRoute.delete("/:slug",  authUser("admin","superAdmin"),onlyAdminAndFacultyAndStudent("admin", "superAdmin"), bookCategoryontroller.deleteBookCategory);
export default bookCategoryRoute;
