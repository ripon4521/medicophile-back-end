import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});


const createBlogCommentSchema = z.object({
    body:z.object({
    userType: z.enum(["admin", "student", "teacher"]),
    userId: ObjectIdSchema,
    blogId: ObjectIdSchema,
    comment: z.string().min(1), 
    status: z.enum(["approved", "pending", "rejected"]),
         
})
  });


  const updateBlogCommentSchema = z.object({
    body:z.object({
    comment: z.string().min(1).optional(), 
    status: z.enum(["approved", "pending", "rejected"]).optional(),
         
})
  });


  export const blogCommentValidation ={
    createBlogCommentSchema,
    updateBlogCommentSchema
  }