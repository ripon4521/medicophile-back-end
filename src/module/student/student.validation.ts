import { z } from "zod";
import { Types } from "mongoose";


const createStudentSchema = z.object({
    body:z.object({
  
  role: z.literal("student"),
  userId: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  profile_picture: z.string().url().optional(),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  name: z.string().min(1, "Name cannot be empty."),
  status: z.enum(["Active", "Blocked"]),
  deletedAt: z.date().nullable(),
  isDeleted: z.boolean(),
        
})
});



const updateStudentSchema = z.object({
    body:z.object({
  
  role: z.literal("student").optional(),
  profile_picture: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long.").optional(),
  name: z.string().min(1, "Name cannot be empty.").optional(),
  status: z.enum(["Active", "Blocked"]).optional(),
  deletedAt: z.date().nullable().optional(),
  isDeleted: z.boolean().optional(),
        
})
});

export const studentValidation = {
    createStudentSchema,
    updateStudentSchema
}