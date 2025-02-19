"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const category_service_1 = require("./category.service");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield category_service_1.CategoryServices.createCategoryIntoDB(payload);
        res.status(200).json({
            success: true,
            message: 'Category created successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to create Category',
        });
    }
});
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryServices.getAlCategoryDB();
        res.status(200).json({
            success: true,
            message: 'Category retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve Category',
        });
    }
});
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const data = req.body;
        const result = yield category_service_1.CategoryServices.updateCategoryDB(categoryId, data);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update Category',
        });
    }
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const result = yield category_service_1.CategoryServices.deleteCategoryDB(categoryId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Category',
        });
    }
});
exports.CategoryControllers = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
};
