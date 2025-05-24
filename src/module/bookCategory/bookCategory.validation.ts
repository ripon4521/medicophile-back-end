import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional string that can be empty string or non-empty
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const createBookCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().optional(),
    createdBy: ObjectIdSchema,
  }),
});

const updateBookCategoryValidationSchema = z.object({
  body: z.object({
    name: optionalNonEmptyString,
    description: z.union([z.string(), z.literal("")]).optional(),
  }),
});

export const bookCategoryValidation = {
  createBookCategoryValidationSchema,
  updateBookCategoryValidationSchema,
};
