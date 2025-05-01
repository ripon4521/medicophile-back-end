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
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_codes_1 = require("http-status-codes");
const order_model_1 = __importDefault(require("./order.model"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const orderDetails_model_1 = __importDefault(require("../orderDetails/orderDetails.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createOrderWithDetails = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const [order] = yield order_model_1.default.create([payload], { session });
        if (!order) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create order.");
        }
        const orderDetailsPayload = {
            orderId: order._id,
            productId: payload.productId,
            quantity: payload.quantity,
            price: payload.paidAmount,
            status: order.status,
            name: payload.name,
            phone: payload.phone,
            address: payload.address,
            paymentStatus: order.paymentStatus,
            paymentInfo: order.paymentInfo
        };
        yield orderDetails_model_1.default.create([orderDetailsPayload], { session });
        yield session.commitTransaction();
        session.endSession();
        return order;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrderFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(order_model_1.default, query)
        .search(["name", "address"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "productId",
    })
        .populate([
        {
            path: "coupon",
        },
    ]);
    const result = yield courseQuery.exec();
    return result;
});
exports.orderService = {
    createOrderWithDetails,
    getAllOrderFromDb
};
