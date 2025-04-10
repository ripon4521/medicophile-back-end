import { Types } from "mongoose";
import { z } from "zod";

const createGapAnswerSchema = z.object({
  body: z.object({
    examId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid examId format",
    }),
    questionId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid questionId format",
    }),
    studentId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid studentId format",
    }),
    answer: z.string().min(1, { message: "Answer cannot be empty" }).max(500, {
      message: "Answer is too long",
    }),
  }),
});

const updateGapAnswerSchema = z.object({
  body: z.object({
    answer: z
      .string()
      .min(1, { message: "Answer cannot be empty" })
      .max(500, {
        message: "Answer is too long",
      })
      .optional(),
  }),
});

export const gapAnswerValidation = {
  createGapAnswerSchema,
  updateGapAnswerSchema,
};
