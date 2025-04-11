import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createCqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    question: z.string().min(1, "Question cannot be empty"),
    status: z.enum(["Published", "Drafted"]),
  }),
});

const updateCqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    durationDate: z.string().optional(),
    question: z.string().min(1, "Question cannot be empty").optional(),
    status: z.enum(["Published", "Drafted"]).optional(),
  }),
});

export const classQuizeQuestionValidation = {
  createCqQuestionSchema,
  updateCqQuestionSchema,
};
