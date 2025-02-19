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
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
// Create a new Category
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.create(payload);
    return result;
});
// Get all Category 
const getAlCategoryDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.find();
    return result;
});
// Update a Category by ID
const updateCategoryDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.findByIdAndUpdate(id, data, { new: true });
    return result;
});
// Delete a Category by ID
const deleteCategoryDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.CategoryModel.findOneAndDelete({ _id: id });
    return result;
});
//all service is exported from this function
exports.CategoryServices = {
    createCategoryIntoDB,
    getAlCategoryDB,
    updateCategoryDB,
    deleteCategoryDB
};
