"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = void 0;
const zod_1 = require("zod");
// Helper: Accepts either a non-empty string or an empty string (for optional fields)
const optionalNonEmptyString = zod_1.z.union([zod_1.z.string().min(1), zod_1.z.literal("")]).optional();
const optionalPhone = zod_1.z.union([
    zod_1.z.string().min(10, "Phone number must be at least 10 digits."),
    zod_1.z.literal(""),
]).optional();
const optionalGurdianPhone = zod_1.z.union([
    zod_1.z
        .string()
        .min(11, "Gurdian Phone too small. Number must be 11 characters.")
        .max(11, "Gurdian phone number must be 11 characters long"),
    zod_1.z.literal(""),
]).optional();
const optionalEmail = zod_1.z.union([zod_1.z.string().email(), zod_1.z.literal("")]).optional();
const optionalURL = zod_1.z.union([zod_1.z.string().url(), zod_1.z.literal("")]).optional();
const optionalPassword = zod_1.z.union([
    zod_1.z.string().min(6, "Password must be at least 6 characters long."),
    zod_1.z.literal(""),
]).optional();
const createStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name cannot be empty."),
        phone: zod_1.z
            .string()
            .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
        email: optionalEmail,
        profile_picture: optionalURL,
        gurdianName: optionalNonEmptyString,
        gurdianPhone: optionalGurdianPhone,
        address: optionalNonEmptyString,
    }),
});
const updateStudentSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.literal("student").optional(),
        profile_picture: optionalURL,
        email: optionalEmail,
        phone: optionalPhone,
        password: optionalPassword,
        name: optionalNonEmptyString,
        gurdianName: optionalNonEmptyString,
        gurdianPhone: optionalGurdianPhone,
        address: optionalNonEmptyString,
        status: zod_1.z.enum(["Active", "Blocked"]).optional(),
    }),
});
exports.studentValidation = {
    createStudentSchema,
    updateStudentSchema,
};
