"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const answerItemSchema = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "McqQuestion",
    },
    selectedAnswer: {
        type: String,
        required: true,
    },
}, { _id: false });
const mcqAttemptSchema = new mongoose_1.Schema({
    answer: {
        type: [answerItemSchema],
        required: true,
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    totalScore: {
        type: Number
    }, totalAttemp: {
        type: Number
    },
    examId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Exam"
    },
    correctCount: { type: Number },
    wrongCount: { type: Number },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }
});
const McqAttemptModel = (0, mongoose_1.model)("McqAttempt", mcqAttemptSchema);
exports.default = McqAttemptModel;
