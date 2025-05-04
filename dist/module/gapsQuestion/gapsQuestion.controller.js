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
exports.gapsQuestionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const gapsQuestion_service_1 = require("./gapsQuestion.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createGapQuestion = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield gapsQuestion_service_1.gapsQuestionService.cretaeGapsQuestion(
        req.body,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      message: "Gap Question Created successfully",
      data: result,
    });
  }),
);
const updateGapQuestion = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Provide _id in body",
      );
    }
    const payload = req.body;
    delete payload._id;
    const result =
      yield gapsQuestion_service_1.gapsQuestionService.updateGapsQuestion(
        _id,
        payload,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Gap Question updated successfully",
      data: result,
    });
  }),
);
const deleteGapQuestion = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Provide _id in body",
      );
    }
    const result =
      yield gapsQuestion_service_1.gapsQuestionService.deleteGapsQuestion(_id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Gap Question deleted successfully",
      data: result,
    });
  }),
);
const getAllGapQuestions = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result =
      yield gapsQuestion_service_1.gapsQuestionService.getAllGapsQuestion(
        query,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Gap Question fatched successfully",
      data: result,
    });
  }),
);
const getSpeecificGaps = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield gapsQuestion_service_1.gapsQuestionService.getSpcificGaps(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Referanc Gaps  fatched successfully",
      data: result,
    });
  }),
);
exports.gapsQuestionController = {
  createGapQuestion,
  updateGapQuestion,
  deleteGapQuestion,
  getAllGapQuestions,
  getSpeecificGaps,
};
