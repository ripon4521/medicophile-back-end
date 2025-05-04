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
exports.offlineBatchService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const course_model_1 = __importDefault(require("../course/course.model"));
const offlineBatch_model_1 = require("./offlineBatch.model");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createOfflineBatch = (paload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
      _id: paload.courseId,
      isDeleted: false,
    });
    if (!course) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        "Inavlid course id",
      );
    }
    const result = yield offlineBatch_model_1.OfflineBatchModel.create(paload);
    return result;
  });
const getAllOfflineBatch = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      offlineBatch_model_1.OfflineBatchModel,
      query,
    )
      .search(["name"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate({ path: "courseId" });
    const result = yield courseQuery.exec();
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed  to get Offline Batch ",
      );
    }
    return result;
  });
const getSingleOfflineBatch = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offlineBatch_model_1.OfflineBatchModel.findOne({
      slug,
    }).populate({
      path: "courseId",
      select:
        "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
    });
    return result;
  });
const updateOfflineBatch = (slug, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const update =
      yield offlineBatch_model_1.OfflineBatchModel.findOneAndUpdate(
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
        "Failed to update Offline Batch.",
      );
    }
    return update;
  });
const deleteOffLineBatch = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield offlineBatch_model_1.OfflineBatchModel.findOneAndUpdate(
        { slug },
        {
          isDeleted: true,
          deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        },
        { new: true },
      );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Faile to delete PLease Try Again ",
      );
    }
    return result;
  });
exports.offlineBatchService = {
  createOfflineBatch,
  updateOfflineBatch,
  deleteOffLineBatch,
  getAllOfflineBatch,
  getSingleOfflineBatch,
};
