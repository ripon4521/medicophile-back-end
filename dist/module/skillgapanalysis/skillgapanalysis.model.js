"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillGapAnalysisModel = void 0;
const mongoose_1 = require("mongoose");
const SkillGapAnalysisSchema = new mongoose_1.Schema({
    job_seeker: { type: mongoose_1.Schema.Types.ObjectId, ref: "JobSeeker", required: true },
    job: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
    missing_skills: { type: [String], default: [] },
    recommended_courses: { type: [String], default: [] },
}, { timestamps: true });
exports.SkillGapAnalysisModel = (0, mongoose_1.model)("SkillGapAnalysis", SkillGapAnalysisSchema);
