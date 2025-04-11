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
exports.courseCategoryService = void 0;
const courseCategory_model_1 = __importDefault(
  require("./courseCategory.model"),
);
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createCourseCategory = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseCategory_model_1.default.create(payload);
    return result;
  });
const getAllCourseCategory = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseCategory_model_1.default.find({
      isDeleted: false,
    });
    return result;
  });
const getSingleCourseCatgeory = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseCategory_model_1.default.findOne({ slug });
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to get Course Ctaegory. Slug is not valid, reload or go back and try again",
      );
    }
    return result;
  });
const updateCourseCategory = (slug, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Update operation
    const update = yield courseCategory_model_1.default.findOneAndUpdate(
      { slug },
      payload,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!update) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to update Course Ctaegory. Slug is not valid, reload or go back and try again",
      );
    }
    return update;
  });
const deleteCourseCategory = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseCategory_model_1.default.findOneAndUpdate(
      { slug },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
      },
      { new: true },
    );
    return result;
  });
exports.courseCategoryService = {
  createCourseCategory,
  getAllCourseCategory,
  updateCourseCategory,
  getSingleCourseCatgeory,
  deleteCourseCategory,
};
