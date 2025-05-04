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
exports.cqQuestionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const classQuizeQuestion_model_1 = __importDefault(
  require("./classQuizeQuestion.model"),
);
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const user_model_1 = require("../user/user.model");
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const createCqQuestion = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
      _id: payload.createdBy,
    });
    const exam = yield exam_model_1.default.findOne({ _id: payload.examId });
    if (!user || user.role === "student") {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid user id , only admin and teacher create cq question",
      );
    }
    if (!exam || exam.examType !== "CQ") {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid exam id. Only cq type exam needed",
      );
    }
    const result = yield classQuizeQuestion_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to create CQ Question, Please check and try again",
      );
    }
    return result;
  });
const getALlCqQuestion = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      classQuizeQuestion_model_1.default,
      query,
    )
      .search(["question"])
      .filter()
      .fields()
      .sort()
      .fields()
      .paginate()
      .populate({
        path: "examId",
        select:
          "examTitle examType totalQuestion positiveMark negativeMark mcqDuration cqMark slug status",
        populate: [
          {
            path: "courseId",
            select:
              "cover_photo course_title description duration course_type expireTime slug price offerPrice",
          },
          { path: "moduleId", select: "moduleTitle slug" },
        ],
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
        "Failed to get Cq Question data. Please check your qury and try again. Query only question filed",
      );
    }
    return result;
  });
const updateCqQuestion = (_id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const update = yield classQuizeQuestion_model_1.default.findOneAndUpdate(
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
        "Failed to  update Cq Question , Please check and try again",
      );
    }
    return update;
  });
const deleteCqQuestion = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classQuizeQuestion_model_1.default.findOneAndUpdate(
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
        "Failed to delete Cq Question. Please check and try again",
      );
    }
    return result;
  });
const getSpcificCq = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classQuizeQuestion_model_1.default
      .find({ examId: id, isDeleted: false })
      .populate("createdBy")
      .populate("examId");
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "exam id is not valid or not found in database",
      );
    }
    return result;
  });
const getSingleQuestion = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield classQuizeQuestion_model_1.default
      .findOne({ _id })
      .populate("examId")
      .populate("createdBy");
    return result;
  });
exports.cqQuestionService = {
  createCqQuestion,
  updateCqQuestion,
  deleteCqQuestion,
  getALlCqQuestion,
  getSpcificCq,
  getSingleQuestion,
};
