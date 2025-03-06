import { z } from "zod";


export const createcanteenstaffValidationSchema = z.object({
    body: z.object({
        role: z.literal("canteen_staff").optional(),
        name: z.string().min(1, "Name is required"),
        gmail: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        address: z.string().min(1, "Address is required"),
        profile_picture: z.string().optional(),
        status: z.enum(["unblocked", "blocked"]).optional(),
        staff_id: z.string().min(1, "Faculty ID is required"),
        canteen_section: z.string().min(1, "Office location is required"),
        shift_timing: z.string(z.string()).optional(),
    }),
});
export const updatecanteenstaffValidationSchema = z.object({
    body: z.object({
        role: z.literal("canteen_staff").optional(),
        name: z.string().min(1, "Name is required").optional(),
        gmail: z.string().email("Invalid email format").optional(),
        password: z.string().min(6, "Password must be at least 6 characters").optional(),
        contact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        address: z.string().min(1, "Address is required").optional(),
        profile_picture: z.string().optional(),
        status: z.enum(["unblocked", "blocked"]).optional(),
        shift_timing: z.string().min(1, "Department is required").optional(),
        canteen_section: z.string().min(1, "Office location is required").optional(),
        staff_id: z.array(z.string()).optional(),
    }),
});
export const canteenstaffValidation = {
    createcanteenstaffValidationSchema,
    updatecanteenstaffValidationSchema
}