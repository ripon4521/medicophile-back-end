"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = void 0;
const zod_1 = require("zod");
const createStudentSchema = zod_1.z.object({
  body: zod_1.z.object({
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits."),
    name: zod_1.z.string().min(1, "Name cannot be empty."),
  }),
});
const updateStudentSchema = zod_1.z.object({
  body: zod_1.z.object({
    role: zod_1.z.literal("student").optional(),
    profile_picture: zod_1.z.string().url().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .optional(),
    password: zod_1.z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .optional(),
    name: zod_1.z.string().min(1, "Name cannot be empty.").optional(),
    gurdianName: zod_1.z
      .string()
      .min(1, "Gurdian Name cannot be empty.")
      .optional(),
    gurdianPhone: zod_1.z
      .string()
      .min(11, "Gurdian Phone too small. Number is must be 11 charachters.")
      .max(11, "Gurdian phone number is must be 11 charcters long")
      .optional(),
    address: zod_1.z.string().min(1, "address is required").optional(),
    status: zod_1.z.enum(["Active", "Blocked"]).optional(),
  }),
});
exports.studentValidation = {
  createStudentSchema,
  updateStudentSchema,
};
