import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Gmail address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    role: z.enum(["superAdmin", "admin", "teacher"]),
    profile_picture: z.string().url().optional(),
    status: z.enum(["Active", "Blocked"]),
    deletedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable()
  }),
});

