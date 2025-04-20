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
const user_model_1 = require("../user/user.model");
const purchaseToken_model_1 = __importDefault(require("./purchaseToken.model"));
const coupon_model_1 = __importDefault(require("../coupon/coupon.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const course_model_1 = __importDefault(require("../course/course.model"));
const createPurchaseToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    const course = yield course_model_1.default.findOne({ _id: payload.courseId, isDeleted: false });
    const coupon = yield coupon_model_1.default.findOne({ coupon: payload.coupon, isDeleted: false });
    if (!coupon || coupon.coupon !== payload.coupon) {
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
const getAllPurchasseToken = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(purchaseToken_model_1.default, query)
        .search([""])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([{
            path: "courseId",
            select: "cover_photo course_title description duration price offerPrice",
            populate: { path: "category", select: "title cover_photo" }
        }])
        .populate([
        {
            path: "studentId",
            select: "name role phone",
        }
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get purchase token");
    }
    return result;
});
const updatePurchaseToken = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield purchaseToken_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update purchase token");
    }
    return result;
});
const deletePurchaseToken = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield purchaseToken_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    }, {
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete purchase token");
    }
    return result;
});
exports.purchaseTokenService = {
    createPurchaseToken,
    getAllPurchasseToken,
    updatePurchaseToken,
    deletePurchaseToken
};
