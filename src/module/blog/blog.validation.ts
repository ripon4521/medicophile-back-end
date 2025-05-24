import { Types } from "mongoose";
import { z } from "zod";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helpers
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalURL = z.union([z.string().url(), z.literal("")]).optional();
const optionalTags = z.union([
  z.array(z.string({ required_error: "Tags must be strings" })).min(1, {
    message: "At least one tag is required",
  }),
  z.literal(""),
]).optional();

const createBlogZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" }),

    description: z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" }),

    categoryId: ObjectIdSchema,
    createdBy: ObjectIdSchema,

    tags: optionalTags,

    status: z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be either 'Published' or 'Drafted'",
    }),

    coverPhoto: optionalURL,
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    title: optionalNonEmptyString,
    description: optionalNonEmptyString,
    categoryId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    tags: optionalTags,
    status: z
      .enum(["Published", "Drafted"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be either 'Published' or 'Drafted'",
      })
      .optional(),
    coverPhoto: optionalURL,
  }),
});

export const blogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
