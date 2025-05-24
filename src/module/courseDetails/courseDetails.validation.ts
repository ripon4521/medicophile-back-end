import { z } from "zod";
import { Types } from "mongoose";

// Reusable ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const optionalObjectId = z.union([ObjectIdSchema, z.literal("")]).optional();

// Optional string array element (non-empty string or "")
const optionalNonEmptyStringArray = z
  .array(z.union([z.string().min(1), z.literal("")]))
  .optional();

// FAQ Schema
export const faqSchema = z.object({
  question: z.union([z.string().min(1, "Question is required"), z.literal("")]).optional(),
  answer: z
    .array(z.union([z.string().min(1, "Answer can't be empty"), z.literal("")]))
    .optional(),
});

// Create Schema (strict)
const createCourseDetailsZodSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    isCourseExist: z
      .array(z.string().min(1))
      .nonempty("At least one course must exist"),
    syllabus: z.array(faqSchema).optional(),
    courseDetails: z.array(faqSchema).optional(),
    instructors: z.array(
      z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId for instructor",
      }),
    ),
  }),
});

// Update Schema (flexible)
const updateCourseDetailsZodSchema = z.object({
  body: z.object({
    isCourseExist: optionalNonEmptyStringArray,
    syllabus: z.array(faqSchema).optional(),
    courseDetails: z.array(faqSchema).optional(),
    instructors: z
      .array(
        z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
          message: "Invalid ObjectId for instructor",
        }),
      )
      .optional(),
  }),
});

export const courseDetailsValidation = {
  createCourseDetailsZodSchema,
  updateCourseDetailsZodSchema,
};
