import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createGapsQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    question: z.string().min(1, { message: "Question is required" }),
    answer: z
      .array(z.string())
      .nonempty({ message: "At least one answer is required" }),
  }),
});

const updateGapsQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    question: z.string().min(1, { message: "Question is required" }).optional(),
    answer: z
      .array(z.string())
      .nonempty({ message: "At least one answer is required" })
      .optional(),
  }),
});

export const gapsQuestionValidation = {
  createGapsQuestionSchema,
  updateGapsQuestionSchema,
};
