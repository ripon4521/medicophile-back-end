import { z } from "zod";

// Reusable ObjectId validator for MongoDB IDs
const zObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });

// Application Zod Schema
const createApplication = z.object({
    body:z.object({
        job: zObjectId, // Validates Job MongoDB ObjectId
        job_seeker: zObjectId, // Validates Job Seeker MongoDB ObjectId
        status: z.enum(["pending", "shortlisted", "rejected"], {
          errorMap: () => ({ message: "Status must be 'pending', 'shortlisted', or 'rejected'" }),
        }),

      
      })
    });

const updateApplication = z.object({
    body:z.object({
       
    
        status: z.enum(["pending", "shortlisted", "rejected"], {
          errorMap: () => ({ message: "Status must be 'pending', 'shortlisted', or 'rejected'" }),
        }),
 

      })
    });


export const applicationValidation = {
  createApplication,
  updateApplication,
};
