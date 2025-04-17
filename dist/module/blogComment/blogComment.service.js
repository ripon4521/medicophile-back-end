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
exports.blogCommentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const blogComment_model_1 = __importDefault(require("./blogComment.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createBlogComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create Blog Comment.  try again");
    }
    return result;
});
const getAllBlogComment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(blogComment_model_1.default, query)
        .search(["comment"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate(["userId"])
        .populate(["blogId"]);
    const result = yield courseQuery.exec();
    return result;
});
const getSingleBlogComment = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.findOne({ slug })
        .populate("userId")
        .populate("blogId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Blog Comment. Slug is not valid, reload or go back and try again");
    }
    return result;
});
const updateBlogComment = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Update operation
    const update = yield blogComment_model_1.default.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Blog Comment. Slug is not valid, reload or go back and try again");
    }
    return update;
});
const deleteBlogComment = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, { new: true });
    return result;
});
const getSpecificBlogComment = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.default.find({ blogId: blogId, isDeleted: false });
    return result;
});
exports.blogCommentService = {
    createBlogComment,
    updateBlogComment,
    deleteBlogComment,
    getAllBlogComment,
    getSingleBlogComment,
    getSpecificBlogComment,
};
