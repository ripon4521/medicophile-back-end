import { z } from "zod";

// Reusable ObjectId validator for MongoDB IDs
const zObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid ObjectId" });

// Experience Schema
const experienceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
});

// Education Schema
const educationSchema = z.object({
  degree: z.string().min(1, { message: "Degree is required" }),
  institution: z.string().min(1, { message: "Institution is required" }),
  year: z.number().int({ message: "Year must be an integer" }),
});

// Preferences Schema
const preferencesSchema = z.object({
  remote_work: z.boolean({ required_error: "Remote work preference is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  salary_range: z.string().min(1, { message: "Salary range is required" }),
});

// Main JobSeeker Schema
const createJobSeeker = z.object({
    body:z.object({
        user: zObjectId, // Validates MongoDB ObjectId
        skills: z.array(z.string().min(1, { message: "Skill cannot be empty" })).nonempty({ message: "At least one skill is required" }),
        experience: z.array(experienceSchema).optional(), // Optional experience array
        education: z.array(educationSchema).optional(), // Optional education array
        resume: z.string().url({ message: "Resume must be a valid URL" }).optional(), // Optional resume URL
        preferences: z.array(preferencesSchema), // Required preferences

    })

});

//Update Validation
const updateJobSeeker = z.object({
    body:z.object({
        skills: z.array(z.string().min(1, { message: "Skill cannot be empty" })).nonempty({ message: "At least one skill is required" }).optional(), // Optional resume URL
        experience: z.array(experienceSchema).optional(), // Optional experience array
        education: z.array(educationSchema).optional(), // Optional education array
        resume: z.string().url({ message: "Resume must be a valid URL" }).optional(), // Optional resume URL
        preferences:z.array(preferencesSchema).optional(), // Required preferences

    })

});

export const jobSeekerValidation = {
  createJobSeeker,
  updateJobSeeker,
};
