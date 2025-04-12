import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";

const blogRoute = Router();
blogRoute.post(
  "/create-blog",
  validateRequest(blogValidation.createBlogZodSchema),
  blogController.createBlog,
);
blogRoute.get("/", blogController.getAllBlog);
blogRoute.get("/:slug", blogController.getSingleBlog);
blogRoute.patch(
  "/:slug",
  validateRequest(blogValidation.updateBlogZodSchema),
  blogController.updateBlog,
);
blogRoute.delete("/:slug", blogController.deleteBlog);
export default blogRoute;
