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
exports.blogCategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const blogCategory_model_1 = __importDefault(require("./blogCategory.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const user_model_1 = require("../user/user.model");
const createBlogCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: payload.createdBy });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid user id. Please provide valid user id");
    }
    const result = yield blogCategory_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create Blog Ctaegory.  try again");
    }
    return result;
});
const getAllBlogCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(blogCategory_model_1.default, query)
        .search(["title"])
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
    return result;
});
const getSingleBlogCatgeory = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_model_1.default.findOne({ slug }).populate("createdBy");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Blog Ctaegory. Slug is not valid, reload or go back and try again");
    }
    return result;
});
const updateBlogCategory = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Update operation
    const update = yield blogCategory_model_1.default.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Blog Ctaegory. Slug is not valid, reload or go back and try again");
    }
    return update;
});
const deleteBlogCategory = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogCategory_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, { new: true });
    return result;
});
exports.blogCategoryService = {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getAllBlogCategory,
    getSingleBlogCatgeory,
};
