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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDB(payload);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to create Order',
        });
    }
});
const CheckoutOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield order_service_1.OrderServices.CheckoutOrderIntoDB(payload);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to create Order',
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let findData = {};
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : {};
        if ((user === null || user === void 0 ? void 0 : user.role) == 'admin') {
            findData = {};
        }
        else {
            findData = { email: user.email };
        }
        const result = yield order_service_1.OrderServices.getAlOrdersFromDB(findData);
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve Order',
        });
    }
});
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const result = yield order_service_1.OrderServices.getSingleOrderFromDB(orderId);
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve order',
        });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const data = req.body;
        const result = yield order_service_1.OrderServices.updateOrderFromDB(orderId, data);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update Order',
        });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const result = yield order_service_1.OrderServices.deleteOrderFromDB(orderId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
            data: result,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete Order',
        });
    }
});
const getTotalOrderRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getTotalPriceFromDB();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: { totalRevenue: result },
        });
    }
    catch (err) {
        console.error('Error calculating total revenue:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to calculate revenue. Please try again later.',
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    CheckoutOrder,
    getTotalOrderRevenue
};
