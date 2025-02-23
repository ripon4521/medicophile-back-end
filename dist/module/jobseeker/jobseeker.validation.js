"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSeekerValidation = void 0;
const zod_1 = require("zod");
// Reusable ObjectId validator for MongoDB IDs
const zObjectId = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });
// Experience Schema
const experienceSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    company: zod_1.z.string().min(1, { message: "Company is required" }),
    duration: zod_1.z.string().min(1, { message: "Duration is required" }),
});
// Education Schema
const educationSchema = zod_1.z.object({
    degree: zod_1.z.string().min(1, { message: "Degree is required" }),
    institution: zod_1.z.string().min(1, { message: "Institution is required" }),
    year: zod_1.z.number().int({ message: "Year must be an integer" }),
});
// Preferences Schema
const preferencesSchema = zod_1.z.object({
    remote_work: zod_1.z.boolean({ required_error: "Remote work preference is required" }),
    location: zod_1.z.string().min(1, { message: "Location is required" }),
    salary_range: zod_1.z.string().min(1, { message: "Salary range is required" }),
});
// Main JobSeeker Schema
const createJobSeeker = zod_1.z.object({
    body: zod_1.z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        skills: zod_1.z.array(zod_1.z.string().min(1, { message: "Skill cannot be empty" })).nonempty({ message: "At least one skill is required" }),
        experience: zod_1.z.array(experienceSchema).optional(), // Optional experience array
        education: zod_1.z.array(educationSchema).optional(), // Optional education array
        resume: zod_1.z.string().url({ message: "Resume must be a valid URL" }).optional(), // Optional resume URL
        preferences: preferencesSchema, // Required preferences
    })
});
//Update Validation
const updateJobSeeker = zod_1.z.object({
    body: zod_1.z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        skills: zod_1.z.array(zod_1.z.string().min(1, { message: "Skill cannot be empty" })).nonempty({ message: "At least one skill is required" }),
        experience: zod_1.z.array(experienceSchema).optional(), // Optional experience array
        education: zod_1.z.array(educationSchema).optional(), // Optional education array
        resume: zod_1.z.string().url({ message: "Resume must be a valid URL" }).optional(), // Optional resume URL
        preferences: preferencesSchema, // Required preferences
    })
});
exports.jobSeekerValidation = {
    createJobSeeker,
    updateJobSeeker,
};
