import { z } from "zod";

// Reusable ObjectId validator for MongoDB IDs
const zObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });

// Job Zod Schema
const createJob = z.object({
    body:z.object({
        title: z.string().min(1, { message: "Job title is required" }),
        description: z.string().min(1, { message: "Job description is required" }),
        recruiter: zObjectId, // Validates MongoDB ObjectId
        skills_required: z.array(z.string().min(1, { message: "Skill cannot be empty" }))
          .nonempty({ message: "At least one skill is required" }),
        location: z.string().min(1, { message: "Location is required" }),
        salary_range: z.string().min(1, { message: "Salary range is required" }),
        job_type: z.enum(["full-time", "part-time", "remote"], {
          errorMap: () => ({ message: "Job type must be 'full-time', 'part-time', or 'remote'" }),
        })
    })


});

const updateJob = z.object({
    body:z.object({
        title: z.string().min(1, { message: "Job title is required" }),
        description: z.string().min(1, { message: "Job description is required" }),
        recruiter: zObjectId, // Validates MongoDB ObjectId
        skills_required: z.array(z.string().min(1, { message: "Skill cannot be empty" }))
          .nonempty({ message: "At least one skill is required" }),
        location: z.string().min(1, { message: "Location is required" }),
        salary_range: z.string().min(1, { message: "Salary range is required" }),
        job_type: z.enum(["full-time", "part-time", "remote"], {
          errorMap: () => ({ message: "Job type must be 'full-time', 'part-time', or 'remote'" }),
        })
    })


});

export const jobValidation = {
  createJob,
  updateJob,
};
