import { z } from "zod";

// Reusable ObjectId validator for MongoDB IDs
const zObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });


const createRecruiter = z.object({
    body:z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        company_name: z.string().min(1, { message: "Company name is required" }),
        company_description: z.string().min(1, { message: "Company description is required" }),
        industry: z.string().min(1, { message: "Industry is required" }),
        website: z.string().url({ message: "Invalid URL format" }).optional(), // Optional website with URL validation
        logo: z.string().url({ message: "Invalid logo URL format" }).optional(), // Optional logo URL
    })

});

const updateRecruiter = z.object({
    body:z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        company_name: z.string().min(1, { message: "Company name is required" }),
        company_description: z.string().min(1, { message: "Company description is required" }),
        industry: z.string().min(1, { message: "Industry is required" }),
        website: z.string().url({ message: "Invalid URL format" }).optional(), // Optional website with URL validation
        logo: z.string().url({ message: "Invalid logo URL format" }).optional(), // Optional logo URL
    })

});

export const recruiterValidation = {
  createRecruiter,
  updateRecruiter
};
