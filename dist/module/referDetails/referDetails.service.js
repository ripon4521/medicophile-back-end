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
exports.referDetailsService = exports.singleReferDetails = void 0;
const http_status_codes_1 = require("http-status-codes");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const referDetails_model_1 = __importDefault(require("./referDetails.model"));
const getAllReferDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(referDetails_model_1.default, query)
        .search(["courseId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title description duration price offerPrice",
            populate: { path: "category", select: "title cover_photo" },
        },
    ])
        .populate([
        {
            path: "referredUserId",
            select: "name role phone profile_picture",
        },
    ])
        .populate([
        {
            path: "referrerId",
            select: "name role phone profile_picture",
        },
    ])
        .populate([
        {
            path: "purchaseTokenId",
<<<<<<< HEAD
            select: "status paymentInfo name phone",
=======
            select: "status paymentInfo name phone"
>>>>>>> 893945e (Resolved merge conflicts)
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get refer details");
    }
    return result;
});
const singleReferDetails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const result = yield referDetails_model_1.default.findOne({ _id })
        .populate([
=======
    const result = yield referDetails_model_1.default.findOne({ _id }).populate([
>>>>>>> 893945e (Resolved merge conflicts)
        {
            path: "courseId",
            select: "cover_photo course_title description duration price offerPrice",
            populate: { path: "category", select: "title cover_photo" },
        },
    ])
        .populate([
        {
            path: "referredUserId",
            select: "name role phone profile_picture",
        },
    ])
        .populate([
        {
            path: "referrerId",
            select: "name role phone profile_picture",
        },
    ])
        .populate([
        {
            path: "purchaseTokenId",
<<<<<<< HEAD
            select: "status paymentInfo name phone",
=======
            select: "status paymentInfo name phone"
>>>>>>> 893945e (Resolved merge conflicts)
        },
    ]);
    return result;
});
exports.singleReferDetails = singleReferDetails;
const deleteReferDetails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield referDetails_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete ");
    }
    return result;
});
exports.referDetailsService = {
    getAllReferDetails,
    deleteReferDetails,
};
