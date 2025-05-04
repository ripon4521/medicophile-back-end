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
exports.gapAttempService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const user_model_1 = require("../user/user.model");
const gapAttemp_model_1 = __importDefault(require("./gapAttemp.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const getAllGapAttemp = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      gapAttemp_model_1.default,
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
    return result;
  });
const getSpecificUserGapsAttempMark = (studentId, examId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const student = yield user_model_1.UserModel.findOne({ _id: studentId });
    const exam = yield exam_model_1.default.findOne({ _id: examId });
    if (!student) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid student id",
      );
    } else if (!exam) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid exam id",
      );
    }
    const result = yield gapAttemp_model_1.default.find({
      studentId,
      examId,
      isDeleted: false,
    });
    // Check what data you're getting
    console.log("Result:", result);
    const totalScore = result.reduce((sum, attempt) => {
      return (
        sum +
        (typeof attempt.score === "number"
          ? attempt.score
          : parseFloat(attempt.score || "0"))
      );
    }, 0);
    console.log("Total Score:", totalScore);
    return {
      totalScore,
      result,
    };
  });
exports.gapAttempService = {
  getAllGapAttemp,
  getSpecificUserGapsAttempMark,
};
