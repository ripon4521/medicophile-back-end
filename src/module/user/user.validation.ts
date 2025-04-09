import { Types } from "mongoose";
import { object, z } from "zod";

// const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
//   message: "Invalid ObjectId format",
// });

export const createUserValidationSchema = z.object({
  body: z.object({
    // studentId:ObjectIdSchema.optional(),
    // teacherId:ObjectIdSchema.optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Gmail address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid contact number"),
    role: z.enum(["superAdmin", "admin", "teacher"]),
    profile_picture: z.string().url().optional(),
    status: z.enum(["Active", "Blocked"]),
    isDeleted: z.boolean(),
    deletedAt: z.date().optional(),
  }),
});
