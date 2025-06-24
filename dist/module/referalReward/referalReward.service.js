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
exports.referRewardService = exports.singleReferReward = void 0;
const http_status_codes_1 = require("http-status-codes");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const referalReward_model_1 = __importDefault(require("./referalReward.model"));
const createReferralReward = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingReward = yield referalReward_model_1.default.findOne({
        referDetailsId: payload.referDetailsId,
        isDeleted: false,
    });
    if (existingReward) {
        // Add new amount to existing one
        existingReward.amount += payload.amount;
        if (typeof payload.isPaid === "boolean") {
            existingReward.isPaid = payload.isPaid;
            if (payload.isPaid) {
                existingReward.paidAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
            }
            else {
                existingReward.paidAt = undefined;
            }
        }
        if (payload.note)
            existingReward.note = payload.note;
        yield existingReward.save();
        return existingReward;
    }
    // No existing reward, create new
    const newRewardData = Object.assign(Object.assign({}, payload), { paidAt: payload.isPaid
            ? new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
            : undefined });
    const newReward = yield referalReward_model_1.default.create(newRewardData);
    return newReward;
});
const getAllReferReward = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const referrerId = query.referrerId;
    delete query.referrerId;
    const courseQuery = new querybuilder_1.default(referalReward_model_1.default, query)
        .search(["referDetailsId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "referDetailsId",
            populate: [
                { path: "referrerId", select: "name role phone profile_picture" },
                { path: "courseId", select: "course_title duration price" },
                {
                    path: "purchaseTokenId",
                    select: "studentId status ref price totalAmount paymentInfo name phone",
                },
            ],
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get refer reward");
    }
    // ✅ Filter manually based on populated referrerId
    const filteredResult = referrerId
        ? result.filter((item) => { var _a, _b, _c; return ((_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.referDetailsId) === null || _a === void 0 ? void 0 : _a.referrerId) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString()) === referrerId; })
        : result;
    return filteredResult;
});
const singleReferReward = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield referalReward_model_1.default.findOne({ _id }).populate([
        {
            path: "referDetailsId",
            populate: [
                { path: "referrerId", select: "name role phone profile_picture" },
                { path: "courseId", select: "course_title duration price" },
                {
                    path: "purchaseTokenId",
                    select: "studentId status ref price totalAmount paymentInfo name phone",
                },
            ],
        },
    ]);
    return result;
});
exports.singleReferReward = singleReferReward;
const deleteReferReward = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield referalReward_model_1.default.findOneAndUpdate({ _id }, {
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
const updateReferReward = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield referalReward_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update ");
    }
    return result;
});
exports.referRewardService = {
    createReferralReward,
    getAllReferReward,
    deleteReferReward,
    updateReferReward,
};
