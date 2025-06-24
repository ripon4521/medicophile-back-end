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
exports.referWithdrawService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const withdraw_model_1 = __importDefault(require("./withdraw.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const referDetails_model_1 = __importDefault(require("../referDetails/referDetails.model"));
const referalReward_model_1 = __importDefault(require("../referalReward/referalReward.model"));
const createReferWithdraw = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: payload.referrerId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid user id. Please provide valid user id");
    }
    // ✅ Check minimum amount
    if (payload.amount < 100) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Minimum withdrawal amount is 100 BDT");
    }
    const referDetails = yield referDetails_model_1.default.findOne({ referrerId: payload.referrerId });
    if (!referDetails) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid transction dd");
    }
    console.log(referDetails);
    const referReward = yield referalReward_model_1.default.findOne({ referDetailsId: referDetails._id });
    if (!referReward) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid transction ff");
    }
    console.log(referReward);
    if ((referReward.amount || 0) < payload.amount) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Insufficient referral balance");
    }
    const result = yield withdraw_model_1.default.create(payload);
    referReward.amount = (referReward.amount || 0) - payload.amount;
    yield referReward.save();
    return result;
});
const getAllReferWithdraw = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(withdraw_model_1.default, query)
        .search(["amount", "referrerId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "referrerId",
            select: "name role phone profile_picture",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get refer withdraw");
    }
    return result;
});
const getSingleReferWithdraw = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_model_1.default.findOne({ _id }).populate([
        {
            path: "referrerId",
            select: "name role phone profile_picture",
        },
    ]);
    return result;
});
const deleteReferWithdraw = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield withdraw_model_1.default.findOneAndUpdate({ _id }, {
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
const updateReferWithdraw = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield withdraw_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update ");
    }
    return result;
});
exports.referWithdrawService = {
    createReferWithdraw,
    updateReferWithdraw,
    deleteReferWithdraw,
    getAllReferWithdraw,
    getSingleReferWithdraw,
};
