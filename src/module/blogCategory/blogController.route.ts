import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogCategoryValidation } from "./blogCategory.validation";
import { blogCategoryController } from "./blogCategory.controller";
import { auth, authUser, onlyAdmin, onlyAdminAndFacultyAndStudent, onlyFaculty } from "../../middlewares/auth";

const blogCategoryRoute = Router();

blogCategoryRoute.post(
  "/", authUser(),onlyAdminAndFacultyAndStudent("admin", "teacher","superAdmin"),
  validateRequest(blogCategoryValidation.createBlogCategorySchema),
  blogCategoryController.createBlogCategory,
);

blogCategoryRoute.get("/", blogCategoryController.getAllBlogCategory);
blogCategoryRoute.get("/:slug", blogCategoryController.getSingleBlogCategory);
blogCategoryRoute.patch(
  "/:slug", authUser(), onlyAdminAndFacultyAndStudent("admin","superAdmin","teacher"),
  validateRequest(blogCategoryValidation.updateBlogCategorySchema),
  blogCategoryController.updateBlogCategory,
);

blogCategoryRoute.delete("/:slug", authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin"), blogCategoryController.deleteBlogCategory);

export default blogCategoryRoute;
