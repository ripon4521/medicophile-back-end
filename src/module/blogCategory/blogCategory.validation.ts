import { z } from "zod";
import { Types } from "mongoose";

// Helper to validate MongoDB ObjectId
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helper: Accepts either a non-empty string or an empty string
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const createBlogCategorySchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title is required"),
    createdBy: ObjectIdSchema,
  }),
});

const updateBlogCategorySchema = z.object({
  body: z.object({
    title: optionalNonEmptyString,
  }),
});

export const blogCategoryValidation = {
  createBlogCategorySchema,
  updateBlogCategorySchema,
};
