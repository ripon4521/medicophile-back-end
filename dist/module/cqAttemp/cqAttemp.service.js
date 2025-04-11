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
const createCqAttemps = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cqAttemp_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to create Cq Attemps. Please cheack and try again",
      );
    }
    return result;
  });
const getAllCqAttemps = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cqAttemp_model_1.default
      .find({ isDeleted: false })
      .populate("studentId")
      .populate("examId")
      .populate("checkedBy");
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
