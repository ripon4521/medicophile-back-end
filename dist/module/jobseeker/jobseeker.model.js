"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSeekerModel = void 0;
const mongoose_1 = require("mongoose");
const JobSeekerSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    experience: [
        {
            title: String,
            company: String,
            duration: String
        }
    ],
    education: [
        {
            degree: String,
            institution: String,
            year: Number
        }
    ],
    resume: {
        type: String
    },
    preferences: {
        remote_work: Boolean,
        location: String,
        salary_range: String,
    },
}, { timestamps: true });
exports.JobSeekerModel = (0, mongoose_1.model)("JobSeeker", JobSeekerSchema);
