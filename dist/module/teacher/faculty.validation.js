"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        phone: zod_1.z
            .string()
            .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    }),
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["superAdmin", "admin", "teacher", "student"]).optional(),
        name: zod_1.z.string().min(3, "Name must be at least 3 characters").optional(),
        phone: zod_1.z
            .string()
            .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
            .optional(),
        email: zod_1.z.string().email("Invalid email format").optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .optional(),
        profile_picture: zod_1.z.string().url("Invalid URL format").optional(),
        status: zod_1.z.enum(["Active", "Blocked"]).optional(),
    }),
});
exports.facultyValidation = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
