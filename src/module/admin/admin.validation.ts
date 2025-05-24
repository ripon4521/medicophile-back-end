import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helper functions
const optionalNonEmptyString = z.union([z.string().min(3), z.literal("")]).optional();
const optionalPhone = z.union([
  z.string().regex(/^\+?(88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  z.literal(""),
]).optional();
const optionalEmail = z.union([z.string().email("Invalid email format"), z.literal("")]).optional();
const optionalURL = z.union([z.string().url("Invalid URL format"), z.literal("")]).optional();
const optionalPassword = z.union([
  z.string().min(6, "Password must be at least 6 characters"),
  z.literal(""),
]).optional();

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
    name: optionalNonEmptyString,
    phone: optionalPhone,
    email: optionalEmail,
    password: optionalPassword,
    profile_picture: optionalURL,
    status: z.enum(["Active", "Blocked"]).optional(),
  }),
});

export const adminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
