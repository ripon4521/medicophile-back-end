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
exports.blogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blog_service_1 = require("./blog.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogService.createBlog(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Blog  Created successfully",
        data: result,
    });
}));
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield blog_service_1.blogService.getAllBlog(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog  fathced successfully",
        data: result,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const result = yield blog_service_1.blogService.getSingleBlog(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog  fathced successfully",
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const payload = req.body;
    const result = yield blog_service_1.blogService.updateBlog(slug, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog  updated successfully",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const result = yield blog_service_1.blogService.deleteBlog(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Blog  Deleted successfully",
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
    getSingleBlog,
};
