import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryvalidation } from "./category.validation";
import { categoryController } from "./category.controller";

const categiryRouter = Router();
categiryRouter.post(
  "/create-category",
  validateRequest(categoryvalidation.createCategorySchema),
  categoryController.createCategory
);
categiryRouter.get("/", categoryController.getAllCategory);
categiryRouter.get("/:id", categoryController.getSingleCategory);
categiryRouter.patch(
  "/:id",
  validateRequest(categoryvalidation.updateCategoryValidationSchema),
  categoryController.updateCategory
);
categiryRouter.delete("/:id", categoryController.deleteCategory);

export default categiryRouter;
