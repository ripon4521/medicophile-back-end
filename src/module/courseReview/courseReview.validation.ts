import { z } from "zod";
import { Types } from "mongoose";

// ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional review string (can be empty or non-empty)
const optionalReview = z.union([z.string().min(1, "Review cannot be empty"), z.literal("")]);

const createCourseReviewZodSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    review: z.string().min(1, "Review cannot be empty"),
  }),
});

const updateCourseReviewZodSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5")
      .optional(),
    review: optionalReview.optional(),
  }),
});

export const coursReviewValidation = {
  createCourseReviewZodSchema,
  updateCourseReviewZodSchema,
};
