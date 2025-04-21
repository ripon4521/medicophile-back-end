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
exports.mcqAttempService = void 0;
const mongoose_1 = require("mongoose");
const mcq_model_1 = __importDefault(require("../mcq/mcq.model"));
const mcqAttemp_model_1 = __importDefault(require("./mcqAttemp.model"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../user/user.model");
const submitAttemptService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ studentId, answer }) {
    const user = yield user_model_1.UserModel.findOne({ _id: studentId });
    if (!user || user.role !== "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid student id. Please provide a valid student is");
    }
    const questionIds = answer.map(a => new mongoose_1.Types.ObjectId(a.questionId));
    // Fetch all answered questions and populate examId
    const questions = yield mcq_model_1.default.find({
        _id: { $in: questionIds }
    }).populate("examId"); // To access positiveMark and negativeMark
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    // Process each answer
    for (const userAnswer of answer) {
        const matchedQuestion = questions.find(q => q._id.toString() === userAnswer.questionId.toString());
        if (!matchedQuestion || !matchedQuestion.examId)
            continue;
        const positiveMark = matchedQuestion.positiveMark || 1;
        const negativeMark = matchedQuestion.negetiveMark || 0;
        // Check if answer is correct
        if (matchedQuestion.correctAnswer === userAnswer.selectedAnswer) {
            score += positiveMark;
            correctCount++;
        }
        else {
            score -= negativeMark;
            wrongCount++;
        }
    }
    const total = answer.length;
    // Save result
    const result = yield mcqAttemp_model_1.default.create({
        studentId: new mongoose_1.Types.ObjectId(studentId),
        answer,
        score,
        total,
        correctCount,
        wrongCount
    });
    return {
        message: "Exam submitted successfully!",
        score,
        correctCount,
        wrongCount,
        total,
        attempt: result
    };
});
const getAllMcq = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcqAttemp_model_1.default.find();
    return result;
});
const getSpcificMcqAttemp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcqAttemp_model_1.default.find({ studentId: id })
        .populate("studentId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "studnt id is not valid or not found in database");
    }
    return result;
});
exports.mcqAttempService = {
    submitAttemptService,
    getSpcificMcqAttemp,
    getAllMcq
};
