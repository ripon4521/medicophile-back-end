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
  question: z
    .union([z.string().min(1, "Question is required"), z.literal("")])
    .optional(),
  answer: z
    .array(z.union([z.string().min(1, "Answer can't be empty"), z.literal("")]))
    .optional(),
});

// ✅ isCourseExist item schema
const courseExistItemSchema = z.object({
  text: z.string().min(1, "Text is required"),
  icon: z.string().min(1, "Icon is required"),
});

// ✅ Create Schema
const createCourseDetailsZodSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    isCourseExist: z
      .array(courseExistItemSchema)
      .nonempty("At least one course feature must exist"),
    syllabus: z.array(faqSchema).optional(),
    courseDetails: z.array(faqSchema).optional(),
    instructors: z.array(
      z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId for instructor",
      }),
    ),
  }),
});

// ✅ Update Schema
const updateCourseDetailsZodSchema = z.object({
  body: z.object({
    isCourseExist: z.array(courseExistItemSchema).optional(),
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
