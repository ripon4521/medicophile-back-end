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
exports.orderDetailsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const orderDetails_model_1 = __importDefault(require("./orderDetails.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const getAllOrderDetailsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(orderDetails_model_1.default, query)
        .search(["name", "address"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "productId",
    });
    const result = yield courseQuery.exec();
    return result;
});
const updateOrderDetailsAndOrderStatus = (orderDetailsId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderDetails = yield orderDetails_model_1.default.findOne({
        _id: orderDetailsId,
        isDeleted: false,
    });
    if (!orderDetails) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "OrderDetails not found");
    }
    // Update orderDetails
    yield orderDetails_model_1.default.updateOne({ _id: orderDetailsId }, payload);
    const updateOrderPayload = {};
    if (payload.status)
        updateOrderPayload.status = payload.status;
    if (payload.paymentStatus)
        updateOrderPayload.paymentStatus = payload.paymentStatus;
    // Update related Order
    yield order_model_1.default.updateOne({ _id: orderDetails.orderId }, updateOrderPayload);
    return {
        success: true,
        message: "OrderDetails ও সংশ্লিষ্ট Order আপডেট হয়েছে",
    };
});
const deleteOrderDeails = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderDetails_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, { new: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
});
exports.orderDetailsService = {
    getAllOrderDetailsFromDb,
    updateOrderDetailsAndOrderStatus,
    deleteOrderDeails,
};
