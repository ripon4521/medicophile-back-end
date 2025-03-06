import { z } from "zod";


export const createFacultyValidationSchema = z.object({
    body: z.object({
        role: z.literal("faculty").optional(),
        name: z.string().min(1, "Name is required"),
        gmail: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        address: z.string().min(1, "Address is required"),
        profile_picture: z.string().optional(),
        status: z.enum(["unblocked", "blocked"]).optional(),
        faculty_id: z.string().min(1, "Faculty ID is required"),
        department: z.string().min(1, "Department is required"),
        office_location: z.string().min(1, "Office location is required"),
        courses_taught: z.array(z.string()).optional(),
    }),
});
export const updateFacultyValidationSchema = z.object({
    body: z.object({
        role: z.literal("faculty").optional(),
        name: z.string().min(1, "Name is required").optional(),
        gmail: z.string().email("Invalid email format").optional(),
        password: z.string().min(6, "Password must be at least 6 characters").optional(),
        contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        address: z.string().min(1, "Address is required").optional(),
        profile_picture: z.string().optional(),
        status: z.enum(["unblocked", "blocked"]).optional(),
        faculty_id: z.string().min(1, "Faculty ID is required").optional(),
        department: z.string().min(1, "Department is required").optional(),
        office_location: z.string().min(1, "Office location is required").optional(),
        courses_taught: z.array(z.string()).optional(),
    }),
});

export const facultysValidation = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema
}