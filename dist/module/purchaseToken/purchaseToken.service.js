"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseTokenService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const course_model_1 = __importDefault(require("../course/course.model"));
const user_model_1 = require("../user/user.model");
const purchaseToken_model_1 = __importDefault(require("./purchaseToken.model"));
const coupon_model_1 = __importDefault(require("../coupon/coupon.model"));
const createPurchaseToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    const course = yield course_model_1.default.findOne({ _id: payload.courseId, isDeleted: false });
    const coupon = yield coupon_model_1.default.findOne({ coupon: payload.coupon, isDeleted: false });
    if (!coupon) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid coupon");
    }
    if (!student) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid student id");
    }
    else if (!course) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid course id");
    }
    const result = yield purchaseToken_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create purchase token");
    }
    return result;
});
exports.purchaseTokenService = {
    createPurchaseToken,
};
