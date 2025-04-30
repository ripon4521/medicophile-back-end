import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookCategoryValidation } from "./bookCategory.validation";
import { bookCategoryontroller } from "./bookCategory.controller";

const bookCategoryRoute = Router();
bookCategoryRoute.post(
  "/cretae-product-category",
  validateRequest(bookCategoryValidation.createBookCategoryValidationSchema),
  bookCategoryontroller.createBookCategory,
);
bookCategoryRoute.get("/", bookCategoryontroller.getAllBookCategory);
bookCategoryRoute.get("/:slug", bookCategoryontroller.getSingleBookCategory);
bookCategoryRoute.patch(
  "/:slug",
  validateRequest(bookCategoryValidation.updateBookCategoryValidationSchema),
  bookCategoryontroller.updateBookCategory,
);
bookCategoryRoute.delete("/:slug", bookCategoryontroller.deleteBookCategory);
export default bookCategoryRoute;
