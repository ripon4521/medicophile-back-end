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
exports.offlineBatchController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const offlineBatch_service_1 = require("./offlineBatch.service");
const createOfflineBatch = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield offlineBatch_service_1.offlineBatchService.createOfflineBatch(
        req.body,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      message: "Offline Batch Created successfully",
      data: result,
    });
  }),
);
const updateOfflineBatch = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const payload = req.body;
    const result =
      yield offlineBatch_service_1.offlineBatchService.updateOfflineBatch(
        slug,
        payload,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Offline Batch updated successfully",
      data: result,
    });
  }),
);
const deleteOfflineBatch = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result =
      yield offlineBatch_service_1.offlineBatchService.deleteOffLineBatch(slug);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Offline Batch deleted successfully",
      data: result,
    });
  }),
);
const getSingleOfflineBatch = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result =
      yield offlineBatch_service_1.offlineBatchService.getSingleOfflineBatch(
        slug,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Single Offline Batch get successfully",
      data: result,
    });
  }),
);
const getAllOfflineBatch = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result =
      yield offlineBatch_service_1.offlineBatchService.getAllOfflineBatch(
        query,
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: " Offline Batch get successfully",
      data: result,
    });
  }),
);
exports.offlineBatchController = {
  createOfflineBatch,
  deleteOfflineBatch,
  updateOfflineBatch,
  getAllOfflineBatch,
  getSingleOfflineBatch,
};
