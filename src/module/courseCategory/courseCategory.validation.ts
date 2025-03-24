import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const createCourseCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    cover_photo: z.string().url("Invalid cover photo URL"),
    createdBy: ObjectIdSchema,
    deletedAt: z.date().nullable().optional(), // `Date` ভ্যালিডেশন
    isDeleted: z.boolean(),
  }),
});

const updateCourseCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    cover_photo: z.string().url("Invalid cover photo URL").optional(),
  }),
});

export const courseCategoryValidation = {
  createCourseCategorySchema,
  updateCourseCategorySchema,
};
