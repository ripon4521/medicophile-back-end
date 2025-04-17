"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogCommentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const blogComment_service_1 = require("./blogComment.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield blogComment_service_1.blogCommentService.createBlogComment(
        req.body,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      message: "Blog Comment Created successfully",
      data: result,
    });
  }),
);
const getAllBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result =
      yield blogComment_service_1.blogCommentService.getAllBlogComment(query);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Blog Comment fathced successfully",
      data: result,
    });
  }),
);
const getSingleBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide a valid slug",
      );
    }
    const result =
      yield blogComment_service_1.blogCommentService.getSingleBlogComment(slug);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Single Blog Comment fathced successfully",
      data: result,
    });
  }),
);
const updateBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide a valid slug",
      );
    }
    const payload = req.body;
    const result =
      yield blogComment_service_1.blogCommentService.updateBlogComment(
        slug,
        payload,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Blog comment updated successfully",
      data: result,
    });
  }),
);
const deleteBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide a valid slug",
      );
    }
    const result =
      yield blogComment_service_1.blogCommentService.deleteBlogComment(slug);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Blog Comment Deleted successfully",
      data: result,
    });
  }),
);
const getSpecificBlogComment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.body;
    if (!blogId) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide a valid blogId",
      );
    }
    const result =
      yield blogComment_service_1.blogCommentService.getSpecificBlogComment(
        blogId,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Blog Comment get successfully",
      data: result,
    });
  }),
);
exports.blogCommentController = {
  createBlogComment,
  updateBlogComment,
  getAllBlogComment,
  getSingleBlogComment,
  deleteBlogComment,
  getSpecificBlogComment,
};
