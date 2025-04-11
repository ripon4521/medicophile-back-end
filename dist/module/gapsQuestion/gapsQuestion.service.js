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
exports.gapsQuestionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const gapsQuestion_model_1 = __importDefault(require("./gapsQuestion.model"));
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const cretaeGapsQuestion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapsQuestion_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create Gaps Question. Please check and try again");
    }
    return result;
});
const getAllGapsQuestion = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(gapsQuestion_model_1.default, query)
        .search(["question", "answer"])
        .paginate()
        .populate(["examId"])
        .populate(["createdBy"]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Gaps Questions. Please check and try again");
    }
    return result;
});
const updateGapsQuestion = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapsQuestion_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update gaps question. Please check id and try again");
    }
    return result;
});
const deleteGapsQuestion = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapsQuestion_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete gaps question. Please check id and try again");
    }
    return result;
});
exports.gapsQuestionService = {
    cretaeGapsQuestion,
    getAllGapsQuestion,
    updateGapsQuestion,
    deleteGapsQuestion,
};
