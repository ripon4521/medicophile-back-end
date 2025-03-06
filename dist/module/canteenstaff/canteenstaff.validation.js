"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canteenstaffValidation = exports.updatecanteenstaffValidationSchema = exports.createcanteenstaffValidationSchema = void 0;
const zod_1 = require("zod");
exports.createcanteenstaffValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("canteen_staff").optional(),
        name: zod_1.z.string().min(1, "Name is required"),
        gmail: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        address: zod_1.z.string().min(1, "Address is required"),
        profile_picture: zod_1.z.string().optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]).optional(),
        staff_id: zod_1.z.string().min(1, "Faculty ID is required"),
        canteen_section: zod_1.z.string().min(1, "Office location is required"),
        shift_timing: zod_1.z.string(zod_1.z.string()).optional(),
    }),
});
exports.updatecanteenstaffValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("canteen_staff").optional(),
        name: zod_1.z.string().min(1, "Name is required").optional(),
        gmail: zod_1.z.string().email("Invalid email format").optional(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        address: zod_1.z.string().min(1, "Address is required").optional(),
        profile_picture: zod_1.z.string().optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]).optional(),
        shift_timing: zod_1.z.string().min(1, "Department is required").optional(),
        canteen_section: zod_1.z.string().min(1, "Office location is required").optional(),
        staff_id: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.canteenstaffValidation = {
    createcanteenstaffValidationSchema: exports.createcanteenstaffValidationSchema,
    updatecanteenstaffValidationSchema: exports.updatecanteenstaffValidationSchema
};
