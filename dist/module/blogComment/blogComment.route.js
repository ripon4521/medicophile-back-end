"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogComment_validation_1 = require("./blogComment.validation");
const blogComment_controller_1 = require("./blogComment.controller");
const blogCommentRouter = (0, express_1.Router)();
blogCommentRouter.post("/create-blog-comment", (0, validateRequest_1.default)(blogComment_validation_1.blogCommentValidation.createBlogCommentSchema), blogComment_controller_1.blogCommentController.createBlogComment);
blogCommentRouter.get("/", blogComment_controller_1.blogCommentController.getAllBlogComment);
blogCommentRouter.patch("/:slug", (0, validateRequest_1.default)(blogComment_validation_1.blogCommentValidation.updateBlogCommentSchema), blogComment_controller_1.blogCommentController.updateBlogComment);
blogCommentRouter.delete("/:slug", blogComment_controller_1.blogCommentController.deleteBlogComment);
blogCommentRouter.get("/specefic-blog-comment", blogComment_controller_1.blogCommentController.getSpecificBlogComment);
blogCommentRouter.get("/:slug", blogComment_controller_1.blogCommentController.getSingleBlogComment);
exports.default = blogCommentRouter;
