"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
// const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
//   message: "Invalid ObjectId format",
// });
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // studentId:ObjectIdSchema.optional(),
        // teacherId:ObjectIdSchema.optional(),
        name: zod_1.z.string().min(1, "Name is required").optional(),
        email: zod_1.z.string().email("Invalid Gmail address").optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .optional(),
        phone: zod_1.z
            .string()
            .regex(/^\+?[0-9]{10,15}$/, "Invalid contact number")
            .optional(),
        role: zod_1.z.enum(["superAdmin", "admin", "teacher"]).optional(),
        profile_picture: zod_1.z.string().url().optional(),
        status: zod_1.z.enum(["Active", "Blocked"]).optional(),
    }),
});
exports.changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z.string({ required_error: "phone number is required" }),
        oldPassword: zod_1.z.string({ required_error: "old password is required" }),
        newPassord: zod_1.z.string({ required_error: "new password is required" }),
        confrimPassord: zod_1.z.string({
            required_error: "confrim password is required",
        }),
    }),
});
