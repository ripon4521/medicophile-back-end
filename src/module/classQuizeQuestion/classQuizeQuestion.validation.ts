import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional string that can be empty or non-empty
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalNonEmptyNumberr = z.union([z.number().min(1), z.literal("")]).optional();

const createCqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    validTime:optionalNonEmptyNumberr,
    question: z.string().min(1, "Question cannot be empty"),
    status: z.enum(["Published", "Drafted"]),
  }),
});

const updateCqQuestionSchema = z.object({
  body: z.object({
    examId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
     validTime:optionalNonEmptyNumberr,
    question: optionalNonEmptyString,
    status: z.enum(["Published", "Drafted"]).optional(),
  }),
});

export const classQuizeQuestionValidation = {
  createCqQuestionSchema,
  updateCqQuestionSchema,
};
