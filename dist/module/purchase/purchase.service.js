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
const purchase_model_1 = require("./purchase.model");
const paymentDetails_model_1 = __importDefault(require("../paymentDetails/paymentDetails.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const sales_model_1 = require("../accounts/sales.model");
const createPurchase = (payload, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (!session) {
        throw new Error("Session is required");
    }
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
    // Update token status
    yield purchaseToken_model_1.default.updateOne({ _id: payload.purchaseToken }, { status: tokenStatus }, { session });
    let result = null;
    if (payload.paymentStatus === "Paid") {
        result = yield purchase_model_1.PurchaseModel.create([payload], { session });
        if (!result || result.length === 0) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create purchase");
        }
        // Create payment details
        const data = {
            purchaseId: result[0]._id,
            studentId: result[0].studentId,
            paidAmount: result[0].totalAmount,
            paymentInfo: result[0].paymentInfo,
        };
        yield paymentDetails_model_1.default.create([data], { session });
        // Create sales record
        const salesPayload = {
            source: "sales",
            purchaseId: result[0]._id,
            customerId: result[0].studentId,
            amount: result[0].totalAmount,
        };
        yield sales_model_1.SalesModel.create([salesPayload], { session });
    }
    return result ? result[0] : null;
});
const getAllPurchase = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(purchase_model_1.PurchaseModel, query)
        .search(["status"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "studentId",
        select: "name role phone",
    })
        .populate([
        {
            path: "courseId",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const deletePurchase = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.PurchaseModel.findOneAndUpdate({ _id }, {
        isDeleted: false,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete purchase");
    }
    return result;
});
const updatePurchase = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.PurchaseModel.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    return result;
});
exports.purchaseService = {
    createPurchase,
    getAllPurchase,
    deletePurchase,
    updatePurchase,
};
