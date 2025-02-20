"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewModel = void 0;
const mongoose_1 = require("mongoose");
const InterviewSchema = new mongoose_1.Schema({
    application: { type: mongoose_1.Schema.Types.ObjectId, ref: "Application", required: true },
    scheduledAt: { type: Date, required: true },
    interview_type: { type: String, enum: ["video", "in-person"], required: true },
    feedback: { type: String },
    status: { type: String, enum: ["completed", "pending"], required: true },
}, { timestamps: true });
exports.InterviewModel = (0, mongoose_1.model)("Interview", InterviewSchema);
