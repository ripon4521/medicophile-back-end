import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const blogRoute = Router();
blogRoute.post(
  "/create-blog",
  authUser(), onlyAdminAndFacultyAndStudent("teacher", "admin", "superAdmin"),
  validateRequest(blogValidation.createBlogZodSchema),
  blogController.createBlog,
);
blogRoute.get("/", blogController.getAllBlog);
blogRoute.get("/:slug", blogController.getSingleBlog);
blogRoute.patch(
  "/:slug",
    authUser(), onlyAdminAndFacultyAndStudent("teacher", "admin", "superAdmin"),
  validateRequest(blogValidation.updateBlogZodSchema),
  blogController.updateBlog,
);
blogRoute.delete("/:slug",   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin"), blogController.deleteBlog);
export default blogRoute;
