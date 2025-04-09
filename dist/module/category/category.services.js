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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const cateegory_model_1 = __importDefault(require("./cateegory.model"));
const category_constant_1 = require("./category.constant");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cateegory_model_1.default.create(payload);
    return result;
});
const getallCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(cateegory_model_1.default, query)
        .search(category_constant_1.searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const updateCatgory = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cateegory_model_1.default.findOneAndUpdate({ _id }, payload);
    return result;
});
const deleteCategory = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cateegory_model_1.default.findOneAndDelete({ _id });
    return result;
});
const singleCategoryget = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cateegory_model_1.default.findOne({ _id });
    return result;
});
exports.categoryService = {
    createCategory,
    getallCategory,
    updateCatgory,
    deleteCategory,
    singleCategoryget,
};
