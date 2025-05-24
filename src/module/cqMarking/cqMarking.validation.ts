import { Types } from "mongoose";
import { z } from "zod";

// Reusable ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Reusable score validation (non-negative number)
const scoreSchema = z.number().min(0, "Score must be a positive number");

const createCqMarkingSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    score: scoreSchema,
    comment: z.string().optional(),
  }),
});

const updateCqMarkingSchema = z.object({
  body: z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    questionId: ObjectIdSchema.optional(),
    score: scoreSchema.optional(),
    comment: z.string().optional(),
  }),
});

export const cqMarkingValidation = {
  createCqMarkingSchema,
  updateCqMarkingSchema,
};
