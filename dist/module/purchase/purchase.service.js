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
exports.purchaseService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const purchaseToken_model_1 = __importDefault(require("../purchaseToken/purchaseToken.model"));
const user_model_1 = require("../user/user.model");
const purchase_model_1 = require("./purchase.model");
const mongoose_1 = __importDefault(require("mongoose"));
const paymentDetails_model_1 = __importDefault(require("../paymentDetails/paymentDetails.model"));
const createPurchase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const student = yield user_model_1.UserModel.findOne({ _id: payload.studentId }).session(session);
        const purchaseToken = yield purchaseToken_model_1.default.findOne({ _id: payload.purchaseToken }).session(session);
        const issuedBy = yield user_model_1.UserModel.findOne({ _id: payload.issuedBy }).session(session);
        if (!student || student.role === "admin" || student.role === "teacher") {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid student id. Only student can buy course");
        }
        if (!purchaseToken) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid purchase token id.");
        }
        if (!issuedBy) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid issuedBy id.");
        }
        // Set values from token
        payload.charge = purchaseToken.charge;
        payload.discount = purchaseToken.discount;
        payload.totalAmount = purchaseToken.totalAmount;
        payload.subtotal = purchaseToken.subtotal;
        payload.courseId = purchaseToken.courseId;
        payload.paymentInfo = purchaseToken.paymentInfo;
        // Update status based on paymentStatus
        let tokenStatus = "";
        if (payload.paymentStatus === "Paid") {
            payload.status = "Active";
            tokenStatus = "Verified";
        }
        else if (payload.paymentStatus === "Pending") {
            payload.status = "Archive";
            tokenStatus = "Pending";
        }
        else if (payload.paymentStatus === "Refunded") {
            payload.status = "Course Out";
            tokenStatus = "Refunded";
        }
        else if (payload.paymentStatus === "Partial") {
            payload.status = "Archive";
            tokenStatus = "Partial";
        }
        else if (payload.paymentStatus === "Rejected") {
            payload.status = "Course Out";
            tokenStatus = "Rejected";
        }
        yield purchaseToken_model_1.default.updateOne({ _id: payload.purchaseToken }, { status: tokenStatus }, { session });
        let result = null;
        if (payload.paymentStatus === "Paid") {
            result = yield purchase_model_1.PurchaseModel.create([payload], { session });
            // set value for payment details
            if (!result) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create result");
            }
            const data = {
                purchaseId: result[0]._id,
                studentId: result[0].studentId,
                paidAmount: result[0].totalAmount,
                paymentInfo: result[0].paymentInfo,
            };
            yield paymentDetails_model_1.default.create([data], { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return result ? result[0] : null;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllPurchase = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.PurchaseModel.find({ isDeleted: false, status: "Active", paymentStatus: "Paid" });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get result");
    }
    return result;
});
const deletePurchase = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.PurchaseModel.findOneAndUpdate({ _id }, {
        isDeleted: false,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    }, {
        new: true
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete purchase");
    }
    return result;
});
const updatePurchase = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPurchase = yield purchase_model_1.PurchaseModel.findById(_id);
    if (!existingPurchase || existingPurchase.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Purchase not found");
    }
    // Update only the allowed fields
    if (payload.status) {
        existingPurchase.status = payload.status;
    }
    if (payload.paymentStatus) {
        existingPurchase.paymentStatus = payload.paymentStatus;
    }
    yield existingPurchase.save();
    return existingPurchase;
});
exports.purchaseService = {
    createPurchase,
    getAllPurchase,
    deletePurchase,
    updatePurchase
};
