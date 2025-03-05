"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsValidation = void 0;
const zod_1 = require("zod");
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("student"),
        student_id: zod_1.z.string().min(1, "Student ID is required"),
        name: zod_1.z.string().min(1, "Name is required"),
        gmail: zod_1.z.string().email(),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
        address: zod_1.z.string().min(1, "Address is required"),
        program: zod_1.z.string().min(1, "Program is required"),
        year_of_study: zod_1.z.number().int().min(1, "Year of study must be at least 1"),
        semester: zod_1.z.string().min(1, "Semester is required"),
        profile_picture: zod_1.z.string().optional(),
        preferences: zod_1.z.object({
            language: zod_1.z.string().min(1, "Language is required"),
            notification_preferences: zod_1.z.object({
                email_notifications: zod_1.z.boolean(),
                sms_notifications: zod_1.z.boolean(),
                push_notifications: zod_1.z.boolean(),
            }),
        }),
        academic_info: zod_1.z.object({
            current_gpa: zod_1.z.number().min(0, "GPA cannot be negative").max(4, "GPA cannot exceed 4.0"),
            major: zod_1.z.string().min(1, "Major is required"),
            minor: zod_1.z.string().optional(),
        }),
        emergency_contact: zod_1.z.object({
            name: zod_1.z.string().min(1, "Emergency contact name is required"),
            relationship: zod_1.z.string().min(1, "Relationship is required"),
            contact: zod_1.z.string().min(1, "Contact is required"),
        }),
        status: zod_1.z.enum(["unblocked", "blocked"]),
    })
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("student").optional(),
        student_id: zod_1.z.string().min(1, "Student ID is required").optional(),
        name: zod_1.z.string().min(1, "Name is required").optional(),
        gmail: zod_1.z.string().email().optional(),
        contact: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number").optional(),
        address: zod_1.z.string().min(1, "Address is required").optional(),
        year_of_study: zod_1.z.number().int().min(1, "Year of study must be at least 1").optional(),
        semester: zod_1.z.string().min(1, "Semester is required").optional(),
        profile_picture: zod_1.z.string().optional(),
        preferences: zod_1.z.object({
            language: zod_1.z.string().min(1, "Language is required").optional(),
            notification_preferences: zod_1.z.object({
                email_notifications: zod_1.z.boolean().optional(),
                sms_notifications: zod_1.z.boolean().optional(),
                push_notifications: zod_1.z.boolean().optional(),
            }).optional(),
        }).optional(),
        academic_info: zod_1.z.object({
            current_gpa: zod_1.z.number().min(0, "GPA cannot be negative").max(4, "GPA cannot exceed 4.0").optional(),
            major: zod_1.z.string().min(1, "Major is required").optional(),
            minor: zod_1.z.string().optional().optional(),
        }).optional(),
        emergency_contact: zod_1.z.object({
            name: zod_1.z.string().min(1, "Emergency contact name is required").optional(),
            relationship: zod_1.z.string().min(1, "Relationship is required").optional(),
            contact: zod_1.z.string().min(1, "Contact is required").optional(),
        }).optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]).optional(),
    })
});
exports.studentsValidation = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};
