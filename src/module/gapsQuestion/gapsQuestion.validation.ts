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
    duration: z.number().min(0, { message: "Duration must be provided" }),
    mark: z.number().min(0, { message: "Mark must be provided" }),
    answer: z
      .array(z.string().min(1, { message: "Answer cannot be empty" }))
      .nonempty({ message: "At least one answer is required" }),
  }),
});

const updateGapsQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    question: z.string().min(1, { message: "Question is required" }).optional(),
    duration: z.number().min(0, { message: "Duration must be provided" }).optional(),
    mark: z.number().min(0, { message: "Mark must be provided" }).optional(),
    answer: z
      .array(z.string().min(1, { message: "Answer cannot be empty" }))
      .nonempty({ message: "At least one answer is required" })
      .optional(),
  }),
});

export const gapsQuestionValidation = {
  createGapsQuestionSchema,
  updateGapsQuestionSchema,
};
