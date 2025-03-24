import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    role: z.enum(["superAdmin", "admin", "teacher"]),
    userId: ObjectIdSchema,
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z
      .string()
      .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    profile_picture: z.string().url("Invalid URL format"),
    status: z.enum(["Active", "Blocked"]),
    deletedAt: z.date().nullable().optional(),
    isDeleted: z.boolean(),
  }),
});

const updateFacultyValidationSchema = z.object({
  bod: z.object({
    role: z.enum(["superAdmin", "admin", "teacher"]).optional(),
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    phone: z
      .string()
      .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
      .optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    profile_picture: z.string().url("Invalid URL format").optional(),
    status: z.enum(["Active", "Blocked"]).optional(),
    deletedAt: z.date().nullable().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
