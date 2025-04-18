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
exports.blogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const blog_model_1 = __importDefault(require("./blog.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const blogCategory_model_1 = __importDefault(require("../blogCategory/blogCategory.model"));
const user_model_1 = require("../user/user.model");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield blogCategory_model_1.default.findOne({ _id: payload.categoryId });
    const user = yield user_model_1.UserModel.findOne({ _id: payload.createdBy });
    if (!user || user.role === "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid user id. blog only created by admin or teacher");
    }
    else if (!category) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid blog category id. please provide valid id ");
    }
    const result = yield blog_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create Blog .  try again");
    }
    return result;
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(blog_model_1.default, query)
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([{
            path: "categoryId",
            select: "title"
        }])
        .populate([{
            path: "createdBy",
            select: "name role phone"
        }]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Blog . please try again");
    }
    return result;
});
const getSingleBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findOne({ slug });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create Blog . please try again");
    }
    return result;
});
const updateBlog = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Blog . please try again");
    }
    return result;
});
const deleteBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete Blog . please try again");
    }
    return result;
});
exports.blogService = {
    createBlog,
    deleteBlog,
    updateBlog,
    getAllBlog,
    getSingleBlog,
};
