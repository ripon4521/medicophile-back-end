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
exports.mcqQuestiionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const mcq_service_1 = require("./mcq.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createMcq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcq_service_1.mcqQuestionService.createMcq(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "MCQ Created successfully",
        data: result,
    });
}));
const getAllMCQ = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield mcq_service_1.mcqQuestionService.getAllMcq(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "MCQ fetched successfully",
        data: result,
    });
}));
const updateMCQ = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "please provide a valid id in params");
    }
    const payload = req.body;
    const result = yield mcq_service_1.mcqQuestionService.updateMcq(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "MCQ updated successfully",
        data: result,
    });
}));
const deleteMCQ = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "please provide a valid id in params");
    }
    const result = yield mcq_service_1.mcqQuestionService.deleteMcq(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "MCQ deleted successfully",
        data: result,
    });
}));
const getSpeecificMccq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield mcq_service_1.mcqQuestionService.getSpcificMcq(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Referanc MCQ  fatched successfully",
        data: result,
    });
}));
exports.mcqQuestiionController = {
    createMcq,
    getAllMCQ,
    updateMCQ,
    deleteMCQ,
    getSpeecificMccq,
};
