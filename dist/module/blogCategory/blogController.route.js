"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogCategory_validation_1 = require("./blogCategory.validation");
const blogCategory_controller_1 = require("./blogCategory.controller");
const auth_1 = require("../../middlewares/auth");
const blogCategoryRoute = (0, express_1.Router)();
blogCategoryRoute.post("/", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "teacher", "superAdmin"), (0, validateRequest_1.default)(blogCategory_validation_1.blogCategoryValidation.createBlogCategorySchema), blogCategory_controller_1.blogCategoryController.createBlogCategory);
blogCategoryRoute.get("/", blogCategory_controller_1.blogCategoryController.getAllBlogCategory);
blogCategoryRoute.get("/:slug", blogCategory_controller_1.blogCategoryController.getSingleBlogCategory);
blogCategoryRoute.patch("/:slug", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin", "teacher"), (0, validateRequest_1.default)(blogCategory_validation_1.blogCategoryValidation.updateBlogCategorySchema), blogCategory_controller_1.blogCategoryController.updateBlogCategory);
blogCategoryRoute.delete("/:slug", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), blogCategory_controller_1.blogCategoryController.deleteBlogCategory);
exports.default = blogCategoryRoute;
