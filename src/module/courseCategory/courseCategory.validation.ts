import { z } from "zod";
import { Types } from "mongoose";

// ObjectId Validation Schema
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const optionalObjectId = z.union([ObjectIdSchema, z.literal("")]).optional();

// Optional helpers
const optionalString = (msg: string) =>
  z.union([z.string().min(1, msg), z.literal("")]).optional();

const optionalURL = (msg: string) =>
  z.union([z.string().url(msg), z.literal("")]).optional();

// Create Course Category Schema
const createCourseCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    cover_photo: z.string().url("Invalid cover photo URL"),
    createdBy: ObjectIdSchema,
  }),
});

// Update Course Category Schema
const updateCourseCategorySchema = z.object({
  body: z.object({
    title: optionalString("Title is required"),
    cover_photo: optionalURL("Invalid cover photo URL"),
    createdBy: optionalObjectId,
  }),
});

export const courseCategoryValidation = {
  createCourseCategorySchema,
  updateCourseCategorySchema,
};
