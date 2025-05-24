import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional string that allows empty string or minimum 1 character string
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

// Optional array of non-empty strings, or empty string (to allow clearing the field)
const optionalStringArray = z.union([z.array(z.string().min(1)), z.literal("")]).optional();

const createMcqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    question: z.string().min(1, "Question is required"),
    questionImg: optionalNonEmptyString,
    options: z.array(z.string().min(1)).min(2, "There must be at least two options"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
    explaination: optionalNonEmptyString,
    tags: optionalStringArray,
    subject: optionalNonEmptyString,
    insertBy: ObjectIdSchema,
  }),
});

const updateMcqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    question: optionalNonEmptyString,
    questionImg: optionalNonEmptyString,
    options: z.array(z.string().min(1)).min(2, "There must be at least two options").optional(),
    correctAnswer: optionalNonEmptyString,
    explaination: optionalNonEmptyString,
    tags: optionalStringArray,
    subject: optionalNonEmptyString,
    questionType: optionalNonEmptyString,
    insertBy: ObjectIdSchema.optional(),
  }),
});

export const mcqValidation = {
  createMcqQuestionSchema,
  updateMcqQuestionSchema,
};
