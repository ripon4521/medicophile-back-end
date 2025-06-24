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
exports.accountsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const income_model_1 = require("./income.model");
const sales_model_1 = require("./sales.model");
const expense_model_1 = require("./expense.model");
const user_model_1 = require("../user/user.model");
const getAllIncomeOrder = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(income_model_1.IncomeModel, query)
        .search(["source", "orderId", "customerId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "orderId",
        },
    ])
        .populate([
        {
            path: "customerId",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get order . please try again");
    }
    return result;
});
const getAllincomeSales = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(sales_model_1.SalesModel, query)
        .search(["source", "purchaseId", "customerId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "purchaseId",
        },
    ])
        .populate([
        {
            path: "customerId",
            select: "name role phone",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get sales . please try again");
    }
    return result;
});
const deleteIncomeOrder = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield income_model_1.IncomeModel.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete income  order. please try again");
    }
    return result;
});
const deleteIncomeSales = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.SalesModel.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete income  . please try again");
    }
    return result;
});
const createExpense = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: payload.addedBy });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    const result = yield expense_model_1.ExpenseModel.create(payload);
    return result;
});
const getAllExpense = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(expense_model_1.ExpenseModel, query)
        .search(["title", "description", "category", "paymentMethod"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "addedBy",
            select: "name role phone profile_picture",
        },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get expense . please try again");
    }
    return result;
});
const getSingleExpense = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.ExpenseModel.findOne({ slug }).populate("addedBy");
    return result;
});
const updateExpense = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield expense_model_1.ExpenseModel.findOneAndUpdate({ slug }, payload, {
        runValidators: true,
        new: true
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Expense . please try again");
    }
    return update;
});
const deleteExpense = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.ExpenseModel.findOneAndUpdate({ slug }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete income  . please try again");
    }
    return result;
});
exports.accountsService = {
    getAllExpense,
    getAllIncomeOrder,
    getAllincomeSales,
    getSingleExpense,
    deleteExpense,
    deleteIncomeOrder,
    deleteIncomeSales,
    updateExpense,
    createExpense
};
