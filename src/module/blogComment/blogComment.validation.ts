import { Types } from "mongoose";
import { z } from "zod";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Allow "" or a valid non-empty string
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const createBlogCommentSchema = z.object({
  body: z.object({
    userType: z.enum(["admin", "student", "teacher"]),
    userId: ObjectIdSchema,
    blogId: ObjectIdSchema,
    comment: z
      .string({ required_error: "Comment is required" })
      .min(1, "Comment cannot be empty"),
  }),
});

const updateBlogCommentSchema = z.object({
  body: z.object({
    comment: optionalNonEmptyString,
    status: z.enum(["approved", "pending", "rejected"]).optional(),
  }),
});

export const blogCommentValidation = {
  createBlogCommentSchema,
  updateBlogCommentSchema,
};
