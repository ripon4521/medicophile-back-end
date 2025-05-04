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
exports.moduleService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const modules_model_1 = __importDefault(require("./modules.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const course_model_1 = __importDefault(require("../course/course.model"));
const createModule = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to create module, please try again and check your from data ",
      );
    }
    return result;
  });
const getAllModule = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      modules_model_1.default,
      query,
    )
      .search(["moduleTitle"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate({
        path: "courseId",
        select:
          "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
        populate: { path: "category", select: "title cover_photo" },
      })
      .populate([
        {
          path: "createdBy",
          select: "name role phone",
        },
      ]);
    const result = yield courseQuery.exec();
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to load data , Please try again",
      );
    }
    return result;
    // .populate([
    //   {
    //     path: "createdBy",
    //     select: "name role phone",
    //   },
    // ]);
    //   .populate("createdBy")
    //   .populate({
    //     path: "courseId",
    //     populate: { path: "category" },
    //   });
    // if (!result) {
    //   throw new AppError(
    //     StatusCodes.BAD_REQUEST,
    //     "Failed to load data , Please try again",
    //   );
    // }
    // return result;
  });
const getSingleModule = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_model_1.default
      .findOne({ slug })
      .populate("createdBy")
      .populate({
        path: "courseId",
        populate: { path: "category" },
      });
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to load data",
      );
    }
    return result;
  });
const getSpecificModule = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id)
    const course = yield course_model_1.default.findOne({ _id: id });
    // console.log(course)
    if (!course) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid course id",
      );
    }
    const result = yield modules_model_1.default
      .find({ courseId: id })
      .populate("createdBy")
      .populate({
        path: "courseId",
        populate: { path: "category" },
      });
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to load data",
      );
    }
    return result;
  });
const updateModule = (slug, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const update = yield modules_model_1.default.findOneAndUpdate(
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
        "Failed to update data , please check data and try again",
      );
    }
    return update;
  });
const deleteModule = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield modules_model_1.default.findOneAndUpdate(
      { slug },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
      },
      { new: true },
    );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        " Failed to delete data, please reload and try again ",
      );
    }
    return result;
  });
exports.moduleService = {
  createModule,
  deleteModule,
  updateModule,
  getAllModule,
  getSingleModule,
  getSpecificModule,
};
