"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultysValidation = exports.updateFacultyValidationSchema = exports.createFacultyValidationSchema = void 0;
const zod_1 = require("zod");
exports.createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("faculty").optional(),
        user: zod_1.z.string().min(1, "User ID is required"),
        name: zod_1.z.string().min(1, "Name is required"),
        gmail: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        address: zod_1.z.string().min(1, "Address is required"),
        profile_picture: zod_1.z.string().optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]).optional(),
        faculty_id: zod_1.z.string().min(1, "Faculty ID is required"),
        department: zod_1.z.string().min(1, "Department is required"),
        office_location: zod_1.z.string().min(1, "Office location is required"),
        courses_taught: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("faculty").optional(),
        user: zod_1.z.string().min(1, "User ID is required").optional(),
        name: zod_1.z.string().min(1, "Name is required").optional(),
        gmail: zod_1.z.string().email("Invalid email format").optional(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        address: zod_1.z.string().min(1, "Address is required").optional(),
        profile_picture: zod_1.z.string().optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]).optional(),
        faculty_id: zod_1.z.string().min(1, "Faculty ID is required").optional(),
        department: zod_1.z.string().min(1, "Department is required").optional(),
        office_location: zod_1.z.string().min(1, "Office location is required").optional(),
        courses_taught: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.facultysValidation = {
    createFacultyValidationSchema: exports.createFacultyValidationSchema,
    updateFacultyValidationSchema: exports.updateFacultyValidationSchema
};
