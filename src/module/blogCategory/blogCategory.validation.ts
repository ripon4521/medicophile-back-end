import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const createBlogCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    createdBy: ObjectIdSchema,
  }),
});

const updateBlogCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
  }),
});

export const blogCategoryValidation = {
  createBlogCategorySchema,
  updateBlogCategorySchema,
};
