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
exports.moduleDetailsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const moduleDetails_service_1 = require("./moduleDetails.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createModuleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_service_1.moduleDetailsService.createModuleDetails(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Module Details Created successfully",
        data: result,
    });
}));
const updateModuleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const payload = req.body;
    delete payload._id;
    // console.log(object)
    if (!_id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Please provide _id ");
    }
    const result = yield moduleDetails_service_1.moduleDetailsService.updateModuleDetails(_id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Module Details updated successfully",
        data: result,
    });
}));
const deleteModuleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const result = yield moduleDetails_service_1.moduleDetailsService.deleteModuleDetails(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Module Details deleted successfully",
        data: result,
    });
}));
const getSingleModuleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield moduleDetails_service_1.moduleDetailsService.getSingleModuleDetails(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Module Details  get successfully",
        data: result,
    });
}));
const getAllModuleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield moduleDetails_service_1.moduleDetailsService.getAllModuleDetails(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Module Details get successfully",
        data: result,
    });
}));
const getSpeecificModuleDtails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield moduleDetails_service_1.moduleDetailsService.getSpcificModuDtails(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Referanc Moduule Dtails  fatched successfully",
        data: result,
    });
}));
exports.moduleDetailsController = {
    createModuleDetails,
    deleteModuleDetails,
    updateModuleDetails,
    getAllModuleDetails,
    getSingleModuleDetails,
    getSpeecificModuleDtails
};
