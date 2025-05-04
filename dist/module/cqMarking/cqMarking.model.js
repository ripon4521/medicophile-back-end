"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const cqMarkingSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    examId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    questionId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "CqQuestion",
        required: true,
    },
    score: { type: Number, required: true, min: 0 },
    comment: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const CqMarkingModel = (0, mongoose_1.model)("CqMarking", cqMarkingSchema);
exports.default = CqMarkingModel;
