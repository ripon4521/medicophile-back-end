import { Types } from "mongoose";
import { object, z } from "zod";

// const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
//   message: "Invalid ObjectId format",
// });

export const createUserValidationSchema = z.object({
  body: z.object({
    // studentId:ObjectIdSchema.optional(),
    // teacherId:ObjectIdSchema.optional(),
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid Gmail address").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .optional(),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Invalid contact number")
      .optional(),
    role: z.enum(["superAdmin", "admin", "teacher", "shopManager"]).optional(),
    profile_picture: z.string().url().optional(),
    status: z.enum(["Active", "Blocked"]).optional(),
  }),
});

export const changePasswordValidation = z.object({
  body: z.object({
    phone: z.string({ required_error: "phone number is required" }),
    oldPassword: z.string({ required_error: "old password is required" }),
    newPassord: z.string({ required_error: "new password is required" }),
    confrimPassord: z.string({
      required_error: "confrim password is required",
    }),
  }), 
});
