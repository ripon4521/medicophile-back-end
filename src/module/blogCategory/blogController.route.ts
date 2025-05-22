import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogCategoryValidation } from "./blogCategory.validation";
import { blogCategoryController } from "./blogCategory.controller";
import { auth } from "../../middlewares/auth";

const blogCategoryRoute = Router();

blogCategoryRoute.post(
  "/",
  validateRequest(blogCategoryValidation.createBlogCategorySchema),
  blogCategoryController.createBlogCategory,
);

blogCategoryRoute.get("/", blogCategoryController.getAllBlogCategory);
blogCategoryRoute.get("/:slug", blogCategoryController.getSingleBlogCategory);
blogCategoryRoute.patch(
  "/:slug",
  validateRequest(blogCategoryValidation.updateBlogCategorySchema),
  blogCategoryController.updateBlogCategory,
);

blogCategoryRoute.delete("/:slug", auth.authUser("student"), blogCategoryController.deleteBlogCategory);

export default blogCategoryRoute;
