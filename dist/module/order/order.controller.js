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
exports.orderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderService.createOrderWithDetails(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Order Created successfully",
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield order_service_1.orderService.getAllOrderFromDb(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Orders fetched successfully",
        data: result,
    });
}));
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield order_service_1.orderService.updateOrderAndOrderDetailsCommonFields(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Order updated successfully",
        data: result,
    });
}));
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield order_service_1.orderService.deleteOrderWithOrderDetails(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Order deleted successfully",
        data: result,
    });
}));
// ✅ Improved Stats Controller with Full Date, Month, Year Filtering Support
const getOrderStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, day, month, year, productSlug } = req.query;
    let matchCondition = { isDeleted: false };
    const dayNum = day ? parseInt(day, 10) : null;
    const monthNum = month ? parseInt(month, 10) : null;
    const yearNum = year ? parseInt(year, 10) : null;
    // Filter by date conditions
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        matchCondition.createdAt = { $gte: start, $lte: end };
    }
    else if (dayNum && monthNum && yearNum) {
        const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
        const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
        matchCondition.createdAt = { $gte: start, $lte: end };
    }
    else if (monthNum && yearNum) {
        const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
        const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
        matchCondition.createdAt = { $gte: start, $lte: end };
    }
    else if (yearNum) {
        const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
        const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
        end.setHours(23, 59, 59, 999);
        matchCondition.createdAt = { $gte: start, $lte: end };
    }
    // Aggregation pipeline
    const pipeline = [
        { $match: matchCondition },
        // Join with Product
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
    ];
    // Filter by productSlug if provided
    if (productSlug) {
        pipeline.push({
            $match: {
                "product.slug": { $regex: new RegExp(`^${productSlug}$`, "i") },
            },
        });
    }
    // Join with User
    pipeline.push({
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
        },
    });
    pipeline.push({ $unwind: "$user" });
    // Final projection
    pipeline.push({
        $project: {
            _id: 1,
            name: 1,
            phone: 1,
            address: 1,
            status: 1,
            paymentStatus: 1,
            paymentInfo: 1,
            subTotal: 1,
            discount: 1,
            totalAmount: 1,
            paidAmount: 1,
            quantity: 1,
            shiping: 1,
            createdAt: 1,
            product: { title: 1, slug: 1, price: 1 },
            user: { name: 1, phone: 1 },
        },
    });
    const orders = yield order_model_1.default.aggregate(pipeline);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Order stats fetched successfully",
        data: {
            total: orders.length,
            orders,
        },
    });
}));
exports.orderController = {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getOrderStats,
};
