"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterValidation = void 0;
const zod_1 = require("zod");
// Reusable ObjectId validator for MongoDB IDs
const zObjectId = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
const createRecruiter = zod_1.z.object({
    body: zod_1.z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        company_name: zod_1.z.string().min(1, { message: "Company name is required" }),
        company_description: zod_1.z.string().min(1, { message: "Company description is required" }),
        industry: zod_1.z.string().min(1, { message: "Industry is required" }),
        website: zod_1.z.string().url({ message: "Invalid URL format" }).optional(), // Optional website with URL validation
        logo: zod_1.z.string().url({ message: "Invalid logo URL format" }).optional(), // Optional logo URL
    })
});
const updateRecruiter = zod_1.z.object({
    body: zod_1.z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        company_name: zod_1.z.string().min(1, { message: "Company name is required" }),
        company_description: zod_1.z.string().min(1, { message: "Company description is required" }),
        industry: zod_1.z.string().min(1, { message: "Industry is required" }),
        website: zod_1.z.string().url({ message: "Invalid URL format" }).optional(), // Optional website with URL validation
        logo: zod_1.z.string().url({ message: "Invalid logo URL format" }).optional(), // Optional logo URL
    })
});
exports.recruiterValidation = {
    createRecruiter,
    updateRecruiter
};
