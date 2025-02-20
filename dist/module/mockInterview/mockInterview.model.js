"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockInterviewModel = void 0;
const mongoose_1 = require("mongoose");
const MockInterviewSchema = new mongoose_1.Schema({
    job_seeker: { type: mongoose_1.Schema.Types.ObjectId, ref: "JobSeeker", required: true },
    questions: { type: [String], required: true },
    responses: [{ question: String, answer: String, confidence_score: Number }],
    feedback: { type: String, required: true },
}, { timestamps: true });
exports.MockInterviewModel = (0, mongoose_1.model)("MockInterview", MockInterviewSchema);
