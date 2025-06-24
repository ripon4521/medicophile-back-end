"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Helpers
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalName = zod_1.z.union([
    zod_1.z.string().min(3, "Name must be at least 3 characters"),
    zod_1.z.literal(""),
]).optional();
const optionalPhone = zod_1.z.union([
    zod_1.z
        .string()
        .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    zod_1.z.literal(""),
]).optional();
const optionalEmail = zod_1.z.union([zod_1.z.string().email("Invalid email format"), zod_1.z.literal("")]).optional();
const optionalPassword = zod_1.z.union([
    zod_1.z.string().min(6, "Password must be at least 6 characters"),
    zod_1.z.literal(""),
]).optional();
const optionalURL = zod_1.z.union([zod_1.z.string().url("Invalid URL format"), zod_1.z.literal("")]).optional();
const createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
        phone: zod_1.z
            .string()
            .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    }),
    email: optionalEmail,
    address: optionalNonEmptyString,
    profile_picture: optionalURL,
});
const updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["superAdmin", "admin", "teacher", "student"]).optional(),
        name: optionalName,
        phone: optionalPhone,
        email: optionalEmail,
        password: optionalPassword,
        address: optionalNonEmptyString,
        profile_picture: optionalURL,
        status: zod_1.z.enum(["Active", "Blocked"]).optional(),
    }),
});
exports.facultyValidation = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};
