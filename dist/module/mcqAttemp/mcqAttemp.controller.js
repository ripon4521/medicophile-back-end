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
exports.mcqAttempController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const mcqAttemp_service_1 = require("./mcqAttemp.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const submitMcqAttemptController = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, answer } = req.body;
    if (!studentId) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid student id",
      );
    }
    const result =
      yield mcqAttemp_service_1.mcqAttempService.submitAttemptService({
        studentId,
        answer,
      });
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "MCQ Atttmp created successfully",
      data: result,
    });
  }),
);
const getSpeecificMccq = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield mcqAttemp_service_1.mcqAttempService.getSpcificMcqAttemp(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Referanc MCQ Attmp  fatched successfully",
      data: result,
    });
  }),
);
const getAllMcq = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield mcqAttemp_service_1.mcqAttempService.getAllMcq(query);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: " MCQ Attmp  fatched successfully",
      data: result,
    });
  }),
);
exports.mcqAttempController = {
  submitMcqAttemptController,
  getSpeecificMccq,
  getAllMcq,
};
