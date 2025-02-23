"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobValidation = void 0;
const zod_1 = require("zod");
// Reusable ObjectId validator for MongoDB IDs
const zObjectId = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
// Job Zod Schema
const createJob = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: "Job title is required" }),
        description: zod_1.z.string().min(1, { message: "Job description is required" }),
        recruiter: zObjectId, // Validates MongoDB ObjectId
        skills_required: zod_1.z.array(zod_1.z.string().min(1, { message: "Skill cannot be empty" }))
            .nonempty({ message: "At least one skill is required" }),
        location: zod_1.z.string().min(1, { message: "Location is required" }),
        salary_range: zod_1.z.string().min(1, { message: "Salary range is required" }),
        job_type: zod_1.z.enum(["full-time", "part-time", "remote"], {
            errorMap: () => ({ message: "Job type must be 'full-time', 'part-time', or 'remote'" }),
        })
    })
});
const updateJob = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: "Job title is required" }),
        description: zod_1.z.string().min(1, { message: "Job description is required" }),
        recruiter: zObjectId, // Validates MongoDB ObjectId
        skills_required: zod_1.z.array(zod_1.z.string().min(1, { message: "Skill cannot be empty" }))
            .nonempty({ message: "At least one skill is required" }),
        location: zod_1.z.string().min(1, { message: "Location is required" }),
        salary_range: zod_1.z.string().min(1, { message: "Salary range is required" }),
        job_type: zod_1.z.enum(["full-time", "part-time", "remote"], {
            errorMap: () => ({ message: "Job type must be 'full-time', 'part-time', or 'remote'" }),
        })
    })
});
exports.jobValidation = {
    createJob,
    updateJob,
};
