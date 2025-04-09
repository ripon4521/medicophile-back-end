"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid Gmail address"),
    password: zod_1.z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    phone: zod_1.z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    role: zod_1.z.enum(["superAdmin", "admin", "teacher"]),
    profile_picture: zod_1.z.string().url().optional(),
    status: zod_1.z.enum(["Active", "Blocked"]),
    isDeleted: zod_1.z.boolean(),
    deletedAt: zod_1.z.date().optional(),
  }),
});
