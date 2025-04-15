import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { blogCommentValidation } from "./blogComment.validation";
import { blogCommentController } from "./blogComment.controller";


const blogCommentRouter = Router();
blogCommentRouter.post('/create-blog-comment', validateRequest(blogCommentValidation.createBlogCommentSchema), blogCommentController.createBlogComment);
blogCommentRouter.get('/', blogCommentController.getAllBlogComment);
blogCommentRouter.patch('/:slug', validateRequest(blogCommentValidation.updateBlogCommentSchema), blogCommentController.updateBlogComment);
blogCommentRouter.delete('/:slug', blogCommentController.deleteBlogComment);
blogCommentRouter.get('/specefic-blog-comment', blogCommentController.getSpecificBlogComment);
blogCommentRouter.get('/:slug', blogCommentController.getSingleBlogComment);
export default  blogCommentRouter;