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
exports.cqQuestionController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const classQuizeQuestion_service_1 = require("./classQuizeQuestion.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createCqQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield classQuizeQuestion_service_1.cqQuestionService.createCqQuestion(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "CQ Question Created successfully",
        data: result,
    });
}));
const getAllCqQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield classQuizeQuestion_service_1.cqQuestionService.getALlCqQuestion(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "CQ Question fatched successfully",
        data: result,
    });
}));
const updateCqQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const payload = req.body;
    delete payload._id;
    const update = yield classQuizeQuestion_service_1.cqQuestionService.updateCqQuestion(_id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "CQ Question updated successfully",
        data: update,
    });
}));
const deleteCqQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const result = yield classQuizeQuestion_service_1.cqQuestionService.deleteCqQuestion(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "CQ Question deleted successfully",
        data: '',
    });
}));
exports.cqQuestionController = {
    createCqQuestion,
    updateCqQuestion,
    deleteCqQuestion,
    getAllCqQuestion
};
