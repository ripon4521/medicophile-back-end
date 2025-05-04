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
exports.batchStuentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const batchStudent_service_1 = require("./batchStudent.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createBatchStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_service_1.batchStudentService.createBatchStudent(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Batch Student  Created successfully",
        data: result,
    });
}));
const getAllBatchStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield batchStudent_service_1.batchStudentService.getAllBatchStudents(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Batch Student  fathced successfully",
        data: result,
    });
}));
const getSingleBatchStduent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Please provide a valid id");
    }
    const result = yield batchStudent_service_1.batchStudentService.getSingleBatchStudent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Batch Student  fathced successfully",
        data: result,
    });
}));
const updateBacthStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Please provide a valid id");
    }
    const payload = req.body;
    const result = yield batchStudent_service_1.batchStudentService.updateBatchStudent(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Batch Studnet  updated successfully",
        data: result,
    });
}));
const deleteBatchStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Please provide a valid id");
    }
    const result = yield batchStudent_service_1.batchStudentService.deleteBatchStduent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Batch Student  Deleted successfully",
        data: result,
    });
}));
exports.batchStuentController = {
    createBatchStudent,
    deleteBatchStudent,
    updateBacthStudent,
    getAllBatchStudent,
    getSingleBatchStduent,
};
