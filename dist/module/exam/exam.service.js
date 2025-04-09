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
exports.examServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const exam_model_1 = __importDefault(require("./exam.model"));
const createExam = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed To Create Exam, Please cheack and try again",
      );
    }
    return result;
  });
const getAllExam = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default
      .find({ isDeleted: false })
      .populate("createdBy")
      .populate({
        path: "courseId",
        populate: { path: "category" },
      })
      .populate("moduleId");
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to load data, please try again",
      );
    }
    return result;
  });
const getSingleExam = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default
      .findOne({ slug })
      .populate("createdBy")
      .populate({
        path: "courseId",
        populate: { path: "category" },
      });
    console.log(result);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to load data , please try again",
      );
    }
    return result;
  });
const updateExam = (slug, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const update = yield exam_model_1.default.findOneAndUpdate(
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
          "Exam not found or update failed.",
        );
      }
      return update;
    } catch (error) {
      console.error("Update Exam Error:", error);
      throw error;
    }
  });
const deleteExam = (slug) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.default.findOneAndUpdate(
      { slug },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
      },
      { new: true },
    );
    return result;
  });
exports.examServices = {
  createExam,
  updateExam,
  deleteExam,
  getAllExam,
  getSingleExam,
};
