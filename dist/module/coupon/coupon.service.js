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
exports.couponService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const coupon_model_1 = __importDefault(require("./coupon.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const user_model_1 = require("../user/user.model");
const createCouponIntoDb = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
      _id: payload.createdBy,
    });
    if (!user || user.role === "student") {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid user id. only admin or teacher created coupon",
      );
    }
    const result = yield coupon_model_1.default.create(payload);
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to create coupon. Please try again",
      );
    }
    return result;
  });
const getAllCuponFromDb = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(
      coupon_model_1.default,
      query,
    )
      .search(["coupon"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate([
        {
          path: "createdBy",
          select: "role name phone profile_picture",
        },
      ]);
    const result = yield courseQuery.exec();
    return result;
  });
const updateCouponInDb = (_id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield coupon_model_1.default.findOne({ _id: _id });
    if (!coupon) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid coupon id.",
      );
    }
    const update = yield coupon_model_1.default.findOneAndUpdate(
      { _id },
      payload,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!update) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Failed to update Coupon. _id is not valid, reload or go back and try again",
      );
    }
    return update;
  });
const deleteCouponFromDb = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield coupon_model_1.default.findOne({ _id: _id });
    if (!coupon) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "invalid coupon id.",
      );
    }
    const result = yield coupon_model_1.default.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
      { new: true },
    );
    if (!result) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "PLease Try Again ",
      );
    }
    return result;
  });
exports.couponService = {
  createCouponIntoDb,
  updateCouponInDb,
  deleteCouponFromDb,
  getAllCuponFromDb,
};
