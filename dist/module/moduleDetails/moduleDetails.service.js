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
exports.moduleDetailsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const moduleDetails_model_1 = __importDefault(require("./moduleDetails.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createModuleDetails = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create module details, please try again",
      );
    }
    return result;
  });
const getAllModuleDetails = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      moduleDetails_model_1.default,
      query,
    )
      .filter()
      .paginate()
      .fields()
      .populate(["courseId"])
      .populate(["moduleId"])
      .populate(["contentId"]);
    const result = yield courseQuery.exec();
    return result;
  });
const getSingleModuleDetails = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_model_1.default
      .findOne({ _id })
      .populate("courseId")
      .populate("moduleId")
      .populate("contentId");
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to load data , please reload and try again",
      );
    }
    return result;
  });
const deleteModuleDetails = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "id not found ",
      );
    }
    const result = yield moduleDetails_model_1.default.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
      },
      { new: true },
    );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to delete data, please provide a valid id",
      );
    }
  });
const updateModuleDetails = (_id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const update = yield moduleDetails_model_1.default.findByIdAndUpdate(
        _id,
        payload,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!update) {
        throw new Error("No data found with the provided ID");
      }
      return update;
    } catch (error) {
      console.error(error);
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred while updating",
      );
    }
  });
exports.moduleDetailsService = {
  createModuleDetails,
  getAllModuleDetails,
  getSingleModuleDetails,
  updateModuleDetails,
  deleteModuleDetails,
};
