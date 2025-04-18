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
exports.cqMarkingService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const cqMarking_model_1 = __importDefault(require("./cqMarking.model"));
const user_model_1 = require("../user/user.model");
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const classQuizeQuestion_model_1 = __importDefault(require("../classQuizeQuestion/classQuizeQuestion.model"));
const createCqMarking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    const exam = yield exam_model_1.default.findOne({ _id: payload.examId });
    const question = yield classQuizeQuestion_model_1.default.findOne({ _id: payload.questionId });
    if (!student) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid student id.");
    }
    else if (!exam) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid exam id");
    }
    else if (!question) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid question id");
    }
    const result = yield cqMarking_model_1.default.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create Cq Marking. Please cheack and try again");
    }
    return result;
});
const getAllCqMarking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cqMarking_model_1.default.find({ isDeleted: false })
        .populate({
        path: "studentId",
        select: "name role phone",
    })
        .populate({
        path: "examId",
        select: "examTitle examType cqMark",
    })
        .populate({
        path: "questionId",
        select: "question",
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Cq Marking. Please cheack and try again");
    }
    return result;
});
const getSpecifUserCqMarking = (studentId, examId, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: studentId });
    const exam = yield exam_model_1.default.findOne({ _id: examId });
    const question = yield classQuizeQuestion_model_1.default.findOne({ _id: questionId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid student id");
    }
    else if (!exam) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid exam id");
    }
    else if (!question) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid question id");
    }
    const result = yield cqMarking_model_1.default.find({
        studentId: studentId,
        examId: examId,
        questionId: questionId,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Specefic Cq Marking. Please cheack and try again");
    }
    return result;
});
const updateCqMarking = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield cqMarking_model_1.default.findOne({ _id: _id });
    if (!check) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid cq marking id");
    }
    const update = yield cqMarking_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update Cq Marking. Please cheack and try again");
    }
    return update;
});
const deleteCqMarking = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield cqMarking_model_1.default.findOne({ _id: _id });
    if (!check) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid cq marking id");
    }
    const update = yield cqMarking_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        runValidators: true,
        new: true,
    });
    if (!update) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete Cq Marking. Please cheack and try again");
    }
    return update;
});
exports.cqMarkingService = {
    createCqMarking,
    deleteCqMarking,
    updateCqMarking,
    getAllCqMarking,
    getSpecifUserCqMarking,
};
