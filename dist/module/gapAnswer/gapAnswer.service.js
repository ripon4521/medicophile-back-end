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
exports.gapsAnserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const gapAnswer_model_1 = __importDefault(require("./gapAnswer.model"));
const gapsQuestion_model_1 = __importDefault(require("../gapsQuestion/gapsQuestion.model"));
const gapAttemp_model_1 = __importDefault(require("../gapsAttemp/gapAttemp.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const exam_model_1 = __importDefault(require("../exam/exam.model"));
const cretaeGapsAnswer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const user = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    const exam = yield exam_model_1.default.findOne({ _id: payload.examId });
    const question = yield gapsQuestion_model_1.default.findOne({ _id: payload.questionId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id");
    }
    else if (!exam) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid exam id");
    }
    else if (!question) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid question id");
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const submissionDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
        const isWithinValidTime = exam.validTime
            ? new Date(submissionDate).getTime() <= new Date(exam.validTime).getTime()
            : true; // যদি validTime না থাকে, তাহলে সবসময় true
        const isCorrect = (_a = question === null || question === void 0 ? void 0 : question.answer) === null || _a === void 0 ? void 0 : _a.includes(payload.answer);
        const score = isCorrect ? question === null || question === void 0 ? void 0 : question.mark : 0;
        const answerData = Object.assign(Object.assign({}, payload), { isCorrect,
            score, totalMarks: score, submittedTime: submissionDate, createdAt: submissionDate });
        if (isWithinValidTime) {
            const result = yield gapAnswer_model_1.default.create([payload], { session });
            if (!result || result.length === 0) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create Gaps Answer. Please check and try again");
            }
            let attempt = yield gapAttemp_model_1.default.findOne({
                studentId: (_b = result[0]) === null || _b === void 0 ? void 0 : _b.studentId,
                examId: (_c = result[0]) === null || _c === void 0 ? void 0 : _c.examId,
            }).session(session);
            if (!attempt) {
                attempt = new gapAttemp_model_1.default({
                    studentId: (_d = result[0]) === null || _d === void 0 ? void 0 : _d.studentId,
                    examId: (_e = result[0]) === null || _e === void 0 ? void 0 : _e.examId,
                    questionId: (_f = result[0]) === null || _f === void 0 ? void 0 : _f.questionId,
                    score,
                    totalMarks: score,
                    submittedTime: submissionDate,
                    attemptedAt: submissionDate,
                    isDeleted: false,
                });
            }
            else {
                attempt.score += score;
                attempt.totalMarks += score;
                attempt.submittedTime = submissionDate;
            }
            yield attempt.save({ session });
            yield session.commitTransaction();
            session.endSession();
            return Object.assign(Object.assign({}, result[0]), { isCorrect,
                score, totalMarks: attempt.totalMarks });
        }
        else {
            yield session.abortTransaction();
            session.endSession();
            return Object.assign(Object.assign({}, answerData), { notSaved: true, message: "Valid submission time is over. Answer not saved in database." });
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllGapsAnswer = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapAnswer_model_1.default.find({ isDeleted: false })
        .populate("examId")
        .populate("questionId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get Gaps Answer. Please check and try again");
    }
    return result;
});
const updateGapsAnser = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapAnswer_model_1.default.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update gaps answer. Please check id and try again");
    }
    return result;
});
const deleteGapsAnswer = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gapAnswer_model_1.default.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete gaps answer. Please check id and try again");
    }
    return result;
});
exports.gapsAnserService = {
    cretaeGapsAnswer,
    deleteGapsAnswer,
    getAllGapsAnswer,
    updateGapsAnser,
};
