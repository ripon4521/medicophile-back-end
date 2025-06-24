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
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const submitAttemptService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ studentId, answer }) {
    const user = yield user_model_1.UserModel.findOne({ _id: studentId });
    if (!user || user.role !== "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid student id. Please provide a valid student id");
    }
    const questionIds = answer.map((a) => new mongoose_1.Types.ObjectId(a.questionId));
    // Fetch all answered questions and populate examId
    const questions = yield mcq_model_1.default.find({
        _id: { $in: questionIds },
    }).populate("examId");
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let examId = null;
    let validTimeExpired = false;
    for (const userAnswer of answer) {
        const matchedQuestion = questions.find((q) => q._id.toString() === userAnswer.questionId.toString());
        if (!matchedQuestion || !matchedQuestion.examId)
            continue;
        const exam = matchedQuestion.examId;
        if (!examId) {
            examId = exam._id;
        }
        // Check validTime
        const now = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // BD time
        if (exam.validTime && new Date(exam.validTime) < now) {
            validTimeExpired = true;
        }
        const positiveMark = matchedQuestion.positiveMark || 1;
        const negativeMark = matchedQuestion.negetiveMark || 0;
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
    let result = null;
    if (!validTimeExpired) {
        result = yield mcqAttemp_model_1.default.create({
            studentId: new mongoose_1.Types.ObjectId(studentId),
            examId,
            answer,
            score,
            total,
            correctCount,
            wrongCount,
        });
    }
    return {
        message: validTimeExpired
            ? "Valid time expired. Result calculated but not saved."
            : "Exam submitted successfully!",
        score,
        correctCount,
        wrongCount,
        total,
        examId,
        attempt: result,
    };
});
const getAllMcq = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(mcqAttemp_model_1.default, query)
        .search(["totalScore"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate({
        path: "studentId",
        select: "name role phone",
    })
        .populate({
        path: "examId",
        select: "examTitle examType totalQuestion positiveMark negativeMark mcqDuration  status",
    })
        .populate({
        path: "answer.questionId",
        select: "question options correctAnswer subject questionType positiveMark negetiveMark",
    });
    const result = yield courseQuery.exec();
    return result;
});
const getSpcificMcqAttemp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mcqAttemp_model_1.default.find({ studentId: id })
        .populate({ path: "studentId", select: "name role phone" })
        .populate("answer.questionId");
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "studnt id is not valid or not found in database");
    }
    return result;
});
exports.mcqAttempService = {
    submitAttemptService,
    getSpcificMcqAttemp,
    getAllMcq,
};
