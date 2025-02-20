"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    recruiter: { type: mongoose_1.Schema.Types.ObjectId, ref: "Recruiter", required: true },
    skills_required: { type: [String], default: [] },
    location: { type: String, required: true },
    salary_range: { type: String, required: true },
    job_type: { type: String, enum: ["full-time", "part-time", "remote"], required: true },
}, { timestamps: { createdAt: "postedAt" } });
exports.JobModel = (0, mongoose_1.model)("Job", JobSchema);
