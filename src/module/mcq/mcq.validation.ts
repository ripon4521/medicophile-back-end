import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalStringArray = z.union([z.array(z.string().min(1)), z.literal("")]).optional();

const createMcqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    question: z.string().min(1, "Question is required"),
    questionImg: optionalNonEmptyString,
    options: z.array(z.string()).min(2, "There must be at least two options"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
    explaination: optionalNonEmptyString,
    tags: z.array(z.string().min(1)).optional(),
    subject: optionalNonEmptyString,
    insertBy: ObjectIdSchema,
  }),
});

const updateMcqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    question: optionalNonEmptyString,
    questionImg: optionalNonEmptyString,
    options: z.array(z.string()).min(2, "There must be at least two options").optional(),
    correctAnswer: optionalNonEmptyString,
    explaination: optionalNonEmptyString,
    tags: z.array(z.string().min(1)).optional(),
    subject: optionalNonEmptyString,
    questionType: optionalNonEmptyString,
    insertBy: ObjectIdSchema.optional(),
  }),
});

export const mcqValidation = {
  createMcqQuestionSchema,
  updateMcqQuestionSchema,
};
