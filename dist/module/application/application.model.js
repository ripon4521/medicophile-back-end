"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const mongoose_1 = require("mongoose");
const ApplicationSchema = new mongoose_1.Schema({
    job: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
    job_seeker: { type: mongoose_1.Schema.Types.ObjectId, ref: "JobSeeker", required: true },
    status: { type: String, enum: ["pending", "shortlisted", "rejected"], required: true },
}, { timestamps: { createdAt: "appliedAt" } });
exports.ApplicationModel = (0, mongoose_1.model)("Application", ApplicationSchema);
