"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cqAttempSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    examId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Exam" },
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "CqQuestions",
    },
    submitedPdf: { type: String },
    score: { type: Number },
    submissionStatus: {
        type: String,
        enum: ["In Time", "Late"],
    },
    submittedTime: {
        type: Date,
        default: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const CqAttempModel = (0, mongoose_1.model)("CqAttemp", cqAttempSchema);
exports.default = CqAttempModel;
