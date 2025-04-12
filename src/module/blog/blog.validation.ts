import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

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

    tags: z
      .array(z.string({ required_error: "Tags must be strings" }))
      .min(1, { message: "At least one tag is required" })
      .optional(),

    status: z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be either 'Published' or 'Drafted'",
    }),

    coverPhoto: z
      .string({ required_error: "Cover photo URL is required" })
      .url({ message: "Cover photo must be a valid URL" })
      .optional(),
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" })
      .optional(),

    description: z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" })
      .optional(),

    categoryId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),

    tags: z
      .array(z.string({ required_error: "Tags must be strings" }))
      .min(1, { message: "At least one tag is required" })
      .optional(),

    status: z
      .enum(["Published", "Drafted"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be either 'Published' or 'Drafted'",
      })
      .optional(),

    coverPhoto: z
      .string({ required_error: "Cover photo URL is required" })
      .url({ message: "Cover photo must be a valid URL" })
      .optional(),
  }),
});

export const blogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
