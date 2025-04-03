"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const categiryRouter = (0, express_1.Router)();
categiryRouter.post("/create-category", (0, validateRequest_1.default)(category_validation_1.categoryvalidation.createCategorySchema), category_controller_1.categoryController.createCategory);
categiryRouter.get("/", category_controller_1.categoryController.getAllCategory);
categiryRouter.get("/:id", category_controller_1.categoryController.getSingleCategory);
categiryRouter.patch("/:id", (0, validateRequest_1.default)(category_validation_1.categoryvalidation.updateCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
categiryRouter.delete("/:id", category_controller_1.categoryController.deleteCategory);
exports.default = categiryRouter;
