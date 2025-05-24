import { Types } from "mongoose";
import { z } from "zod";

// Reusable ObjectId schema
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Reusable answer schema
const AnswerSchema = z
  .string()
  .min(1, { message: "Answer cannot be empty" })
  .max(500, { message: "Answer is too long" });

// Create Schema
const createGapAnswerSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    studentId: ObjectIdSchema,
    answer: AnswerSchema,
  }),
});

// Update Schema
const updateGapAnswerSchema = z.object({
  body: z.object({
    answer: AnswerSchema.optional(),
  }),
});

export const gapAnswerValidation = {
  createGapAnswerSchema,
  updateGapAnswerSchema,
};
