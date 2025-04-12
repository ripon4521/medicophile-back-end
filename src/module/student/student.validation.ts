import { z } from "zod";
import { Types } from "mongoose";

const createStudentSchema = z.object({
  body: z.object({
    role: z.literal("student"),
    profile_picture: z.string().url().optional(),
    email: z.string().email(),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    name: z.string().min(1, "Name cannot be empty."),
    gurdianName: z.string().min(1, "Gurdian Name cannot be empty.").optional(),
    gurdianPhone: z
      .string()
      .min(11, "Gurdian Phone too small. Number is must be 11 charachters.")
      .max(11, "Gurdian phone number is must be 11 charcters long")
      .optional(),
    address: z.string().min(1, "address is required"),
    status: z.enum(["Active", "Blocked"]),
  }),
});

const updateStudentSchema = z.object({
  body: z.object({
    role: z.literal("student").optional(),
    profile_picture: z.string().url().optional(),
    email: z.string().email().optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits.")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .optional(),
    name: z.string().min(1, "Name cannot be empty.").optional(),
    gurdianName: z.string().min(1, "Gurdian Name cannot be empty.").optional(),
    gurdianPhone: z
      .string()
      .min(11, "Gurdian Phone too small. Number is must be 11 charachters.")
      .max(11, "Gurdian phone number is must be 11 charcters long")
      .optional(),
    address: z.string().min(1, "address is required").optional(),
    status: z.enum(["Active", "Blocked"]).optional(),
  }),
});

export const studentValidation = {
  createStudentSchema,
  updateStudentSchema,
};
