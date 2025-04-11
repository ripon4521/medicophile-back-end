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
exports.cqMarkingContoller = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cqMarking_service_1 = require("./cqMarking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createCqMarking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result =
      yield cqMarking_service_1.cqMarkingService.createCqMarking(payload);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      message: "CQ Marking Created successfully",
      data: result,
    });
  }),
);
const getAllCqMarking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cqMarking_service_1.cqMarkingService.getAllCqMarking();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "CQ Marking fatched successfully",
      data: result,
    });
  }),
);
const updateCqMarking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide _id ",
      );
    }
    const payload = req.body;
    delete payload._id;
    const result = yield cqMarking_service_1.cqMarkingService.updateCqMarking(
      _id,
      payload,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "CQ Marking updated successfully",
      data: result,
    });
  }),
);
const deleteCqMarking = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    if (!_id) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Please provide _id ",
      );
    }
    const result =
      yield cqMarking_service_1.cqMarkingService.deleteCqMarking(_id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: "CQ Marking deleetd successfully",
      data: "",
    });
  }),
);
exports.cqMarkingContoller = {
  createCqMarking,
  updateCqMarking,
  deleteCqMarking,
  getAllCqMarking,
};
