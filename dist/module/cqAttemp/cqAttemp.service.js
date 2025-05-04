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
exports.cqAttemService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const cqAttemp_model_1 = __importDefault(require("./cqAttemp.model"));
const classQuizeQuestion_model_1 = __importDefault(
  require("../classQuizeQuestion/classQuizeQuestion.model"),
);
const user_model_1 = require("../user/user.model");
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createCqAttemps = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const student = yield user_model_1.UserModel.findOne({
      _id: payload.studentId,
    });
    const exam = yield exam_model_1.default.findOne({ _id: payload.examId });
    const question = yield classQuizeQuestion_model_1.default.findOne({
      _id: payload.questionId,
    });
    if (!student || student.role !== "student") {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Invalid Student Id. ",
      );
    } else if (!exam) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Invalid Exam Id",
      );
    } else if (!question) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Invalid Question Id",
      );
    }
    const result = yield cqAttemp_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to cerate cq attemp",
      );
    }
  });
const getAllCqAttemps = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      cqAttemp_model_1.default,
      query,
    )
      .search(["score"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate({
        path: "studentId",
        select: "name role phone",
      })
      .populate([
        {
          path: "examId",
          select: "examTitle rolexamTypee examType",
        },
      ])
      .populate([
        {
          path: "questionId",
          select: "question",
        },
      ]);
    const result = yield courseQuery.exec();
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to get Cq Attemps . Please try again",
      );
    }
    return result;
  });
const updateCqAttemps = (_id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const update = yield cqAttemp_model_1.default.findOneAndUpdate(
      { _id },
      payload,
      {
        runValidators: true,
        new: true,
      },
    );
    if (!update) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to update Cq Attemps . Please try again",
      );
    }
    return update;
  });
const deleteCqAttemps = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cqAttemp_model_1.default.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
      {
        new: true,
      },
    );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to delete Cq Attemps . Please try again",
      );
    }
    return result;
  });
exports.cqAttemService = {
  createCqAttemps,
  updateCqAttemps,
  deleteCqAttemps,
  getAllCqAttemps,
};
