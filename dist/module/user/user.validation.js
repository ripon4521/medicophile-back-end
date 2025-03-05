"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaValidation = void 0;
const zod_1 = require("zod");
exports.UserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        gmail: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
        contact: zod_1.z.string().min(10, "Contact number must be at least 10 digits"),
        address: zod_1.z.string().min(1, "Address is required"),
        role: zod_1.z.enum(["admin", "student", "faculty", "guest", "canteen_staff"]),
        profile_picture: zod_1.z.string().url("Invalid URL").optional(),
        registration_date: zod_1.z.coerce.date(),
        last_login: zod_1.z.coerce.date().optional(),
        status: zod_1.z.enum(["unblocked", "blocked"]),
    })
});
