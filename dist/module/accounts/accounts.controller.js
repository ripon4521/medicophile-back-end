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
exports.accountsController = exports.getExpenseReport = exports.getIncomeReport = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const accounts_service_1 = require("./accounts.service");
const order_model_1 = __importDefault(require("../order/order.model"));
const sales_model_1 = require("./sales.model");
const expense_model_1 = require("./expense.model");
const createExpense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield accounts_service_1.accountsService.createExpense(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Expense  Created successfully",
        data: result,
    });
}));
const getAllExpense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield accounts_service_1.accountsService.getAllExpense(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Expense  get successfully",
        data: result,
    });
}));
const getAllIncomeOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield accounts_service_1.accountsService.getAllIncomeOrder(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Income Order  get successfully",
        data: result,
    });
}));
const getAllIncomeSales = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield accounts_service_1.accountsService.getAllincomeSales(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Income Sales  get successfully",
        data: result,
    });
}));
const updateExpense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const payload = req.body;
    const result = yield accounts_service_1.accountsService.updateExpense(slug, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Expense updated successfully",
        data: result,
    });
}));
const getSingleExpense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield accounts_service_1.accountsService.getSingleExpense(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Single Expense get successfully",
        data: result,
    });
}));
const deleteExpense = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield accounts_service_1.accountsService.deleteExpense(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Expense deleted successfully",
        data: result,
    });
}));
const deleteIncomeOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield accounts_service_1.accountsService.deleteIncomeOrder(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Income Order deleted successfully",
        data: result,
    });
}));
const deleteIncomeSales = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield accounts_service_1.accountsService.deleteIncomeSales(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Income Sales deleted successfully",
        data: result,
    });
}));
const getIncomeReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const filter = {};
        // Only add createdAt filter if at least one date is provided
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }
        const orderQuery = Object.assign(Object.assign({}, filter), { paymentStatus: "Paid" });
        const salesQuery = Object.assign({}, filter);
        const orders = yield order_model_1.default.find(orderQuery);
        const sales = yield sales_model_1.SalesModel.find(salesQuery);
        const orderIncome = orders.reduce((acc, curr) => acc + curr.paidAmount, 0);
        const salesIncome = sales.reduce((acc, curr) => acc + curr.amount, 0);
        const totalIncome = orderIncome + salesIncome;
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            totalIncome,
            breakdown: {
                orderIncome,
                salesIncome,
                orderCount: orders.length,
                salesCount: sales.length,
            },
            details: {
                orders,
                sales,
            },
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to generate income report",
            error,
        });
    }
});
exports.getIncomeReport = getIncomeReport;
const getExpenseReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const filter = Object.assign({ isDeleted: false }, (startDate && endDate
            ? {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            }
            : {}));
        const expenses = yield expense_model_1.ExpenseModel.find(filter);
        const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            totalExpense,
            count: expenses.length,
            expenses,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to generate expense report',
            error: error,
        });
    }
});
exports.getExpenseReport = getExpenseReport;
exports.accountsController = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    getAllIncomeOrder,
    getAllIncomeSales,
    deleteIncomeOrder,
    deleteIncomeSales,
    getIncomeReport: exports.getIncomeReport,
    getExpenseReport: exports.getExpenseReport
};
