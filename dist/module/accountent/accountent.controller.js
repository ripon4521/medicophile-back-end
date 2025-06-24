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
exports.shopManagerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const accountent_service_1 = require("./accountent.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const getAllShopManager = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield accountent_service_1.shopManagerService.getShopManager(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Shop Manager getting successfully",
        data: result,
    });
}));
const deleteShopMnagaer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = yield accountent_service_1.shopManagerService.deleteShopManager(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "shop manager Deleted successfully",
        data: result,
    });
}));
const updateShopMnagaer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const data = req.body;
    const result = yield accountent_service_1.shopManagerService.updateShopManager(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Shop Mnagaer & Nested User Updated successfully",
        data: result,
    });
}));
const getSingleManager = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield accountent_service_1.shopManagerService.getSingleManager(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Shop Manager & Nested User get successfully",
        data: result,
    });
}));
exports.shopManagerController = {
    getAllShopManager,
    updateShopMnagaer,
    deleteShopMnagaer,
    getSingleManager
};
