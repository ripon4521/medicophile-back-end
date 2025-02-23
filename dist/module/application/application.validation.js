"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationValidation = void 0;
const zod_1 = require("zod");
// Reusable ObjectId validator for MongoDB IDs
const zObjectId = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
// Application Zod Schema
const createApplication = zod_1.z.object({
    body: zod_1.z.object({
        job: zObjectId, // Validates Job MongoDB ObjectId
        job_seeker: zObjectId, // Validates Job Seeker MongoDB ObjectId
        status: zod_1.z.enum(["pending", "shortlisted", "rejected"], {
            errorMap: () => ({ message: "Status must be 'pending', 'shortlisted', or 'rejected'" }),
        }),
    })
});
const updateApplication = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "shortlisted", "rejected"], {
            errorMap: () => ({ message: "Status must be 'pending', 'shortlisted', or 'rejected'" }),
        }),
    })
});
exports.applicationValidation = {
    createApplication,
    updateApplication,
};
