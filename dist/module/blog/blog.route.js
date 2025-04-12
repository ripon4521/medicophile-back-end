"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const blogRoute = (0, express_1.Router)();
blogRoute.post("/create-blog", (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogZodSchema), blog_controller_1.blogController.createBlog);
blogRoute.get("/", blog_controller_1.blogController.getAllBlog);
blogRoute.get("/:slug", blog_controller_1.blogController.getSingleBlog);
blogRoute.patch("/:slug", (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogZodSchema), blog_controller_1.blogController.updateBlog);
blogRoute.delete("/:slug", blog_controller_1.blogController.deleteBlog);
exports.default = blogRoute;
