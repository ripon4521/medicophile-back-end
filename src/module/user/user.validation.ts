import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name must be provided and must be a string",
      })
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
      .string({
        required_error: "Email must be provided and must be a string",
      })
      .email({ message: "Invalid email address" }),

    password: z
      .string({
        required_error: "Password is required for your safety",
      })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" }),

    role: z
      .enum(["admin", "user"], {
        required_error: "Role must be provided and must be 'admin' or 'user'",
      })
      .default("user"),

    isBlocked: z.boolean().default(false),

    createdAt: z.date().default(() => new Date()),

    updatedAt: z.date().default(() => new Date()),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
