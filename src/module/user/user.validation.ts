import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    gmail: z.string().email("Invalid Gmail address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    district: z.string().min(1, "District is required"),
    division: z.string().min(1, "Division is required"),
    contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    gender: z.enum(["Male", "Female", "Other"]),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    religion: z.string().min(1, "Religion is required"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(["admin", "student", "faculty"]),
    profile_picture: z.string().url().optional(),
    status: z.enum(["unblocked", "blocked"]),
  }),
});

