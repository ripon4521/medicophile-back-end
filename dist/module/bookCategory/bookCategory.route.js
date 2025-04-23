"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookCategory_validation_1 = require("./bookCategory.validation");
const bookCategory_controller_1 = require("./bookCategory.controller");
const bookCategoryRoute = (0, express_1.Router)();
bookCategoryRoute.post('/cretae-book-category', (0, validateRequest_1.default)(bookCategory_validation_1.bookCategoryValidation.createBookCategoryValidationSchema), bookCategory_controller_1.bookCategoryontroller.createBookCategory);
bookCategoryRoute.get('/', bookCategory_controller_1.bookCategoryontroller.getAllBookCategory);
bookCategoryRoute.get('/:slug', bookCategory_controller_1.bookCategoryontroller.getSingleBookCategory);
bookCategoryRoute.patch('/:slug', (0, validateRequest_1.default)(bookCategory_validation_1.bookCategoryValidation.updateBookCategoryValidationSchema), bookCategory_controller_1.bookCategoryontroller.updateBookCategory);
bookCategoryRoute.delete('/:slug', bookCategory_controller_1.bookCategoryontroller.deleteBookCategory);
exports.default = bookCategoryRoute;
