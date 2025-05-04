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
exports.bookCategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const bookCategory_model_1 = __importDefault(require("./bookCategory.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const user_model_1 = require("../user/user.model");
const createBookCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        _id: payload.createdBy,
        isDeleted: false,
    });
    if (!user || user.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id. Only admin or teacher can create product category .Please  try again");
    }
    const result = yield bookCategory_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create Book Category.Please  try again");
    }
    return result;
});
const updateBookCategory = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isexist = yield bookCategory_model_1.default.findOne({
        slug: slug,
        isDeleted: false,
    });
    if (!isexist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Slug is not valid.Please  try again");
    }
    const result = yield bookCategory_model_1.default.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Update Book Category.Please  try again");
    }
    return result;
});
const deleteBookCategory = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const isexist = yield bookCategory_model_1.default.findOne({
        slug: slug,
        isDeleted: false,
    });
    if (!isexist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Slug is not valid.Please  try again");
    }
    const result = yield bookCategory_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Delete Book Category.Please  try again");
    }
    return result;
});
const getAllBookCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(bookCategory_model_1.default, query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "createdBy",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Book Category. please try again");
    }
    return result;
});
const getSingleBookCategory = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookCategory_model_1.default.findOne({ slug });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Get Single Book Category.Please  try again");
    }
    return result;
});
exports.bookCategoryService = {
    createBookCategory,
    updateBookCategory,
    deleteBookCategory,
    getAllBookCategory,
    getSingleBookCategory,
};
