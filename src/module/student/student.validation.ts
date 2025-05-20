import { z } from "zod";
import { Types } from "mongoose";

// Helper: Accepts either a non-empty string or an empty string (for optional fields)
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalPhone = z.union([
  z.string().min(10, "Phone number must be at least 10 digits."),
  z.literal(""),
]).optional();
const optionalGurdianPhone = z.union([
  z
    .string()
    .min(11, "Gurdian Phone too small. Number must be 11 characters.")
    .max(11, "Gurdian phone number must be 11 characters long"),
  z.literal(""),
]).optional();
const optionalEmail = z.union([z.string().email(), z.literal("")]).optional();
const optionalURL = z.union([z.string().url(), z.literal("")]).optional();
const optionalPassword = z.union([
  z.string().min(6, "Password must be at least 6 characters long."),
  z.literal(""),
]).optional();

const createStudentSchema = z.object({
  body: z.object({
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
    name: z.string().min(1, "Name cannot be empty."),
  }),
});

const updateStudentSchema = z.object({
  body: z.object({
    role: z.literal("student").optional(),
    profile_picture: optionalURL,
    email: optionalEmail,
    phone: optionalPhone,
    password: optionalPassword,
    name: optionalNonEmptyString,
    gurdianName: optionalNonEmptyString,
    gurdianPhone: optionalGurdianPhone,
    address: optionalNonEmptyString,
    status: z.enum(["Active", "Blocked"]).optional(),
  }),
});

export const studentValidation = {
  createStudentSchema,
  updateStudentSchema,
};
