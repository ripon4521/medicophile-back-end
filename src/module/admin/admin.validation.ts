import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z
      .string()
      .regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    role: z.enum(["superAdmin", "admin", "teacher", "student"]).optional(),
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
  }),
});

export const adminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
