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
exports.liveClassController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const liveClass_service_1 = require("./liveClass.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createLiveClass = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield liveClass_service_1.liveClassService.createLiveClass(
      req.body,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      message: "Live Class Created successfully",
      data: result,
    });
  }),
);
const getAllLiveClass = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield liveClass_service_1.liveClassService.getAllLiveClass();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Live Class fatched successfully",
      data: result,
    });
  }),
);
const getSingleLiveClass = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide valid slug",
      );
    }
    const result =
      yield liveClass_service_1.liveClassService.singleGetLiveClass(slug);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "Single Live Class fatched successfully",
      data: result,
    });
  }),
);
const deleteLiveClass = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide valid slug",
      );
    }
    const result =
      yield liveClass_service_1.liveClassService.deleteLiveClass(slug);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: " Live Class deleted successfully",
      data: result,
    });
  }),
);
const updateLiveClass = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const payload = req.body;
    if (!slug) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide valid slug",
      );
    }
    const result = yield liveClass_service_1.liveClassService.updateLiveClass(
      slug,
      payload,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: " Live Class updated successfully",
      data: result,
    });
  }),
);
exports.liveClassController = {
  createLiveClass,
  deleteLiveClass,
  updateLiveClass,
  getAllLiveClass,
  getSingleLiveClass,
};
