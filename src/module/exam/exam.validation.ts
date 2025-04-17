import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1, "Exam title is required"),
    createdBy: ObjectIdSchema,
    courseId: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    examType: z.enum(["MCQ", "CQ", "Fill in the gaps"], {
      required_error: "Exam type is required",
    }),
    totalQuestion: z.number().int().min(1, "Must be at least 1").optional(),
    positiveMark: z
      .number()
      .min(0, "Positive mark must be 0 or more")
      .optional(),
    negativeMark: z
      .number()
      .min(0, "Negative mark must be 0 or more")
      .optional(),
    mcqDuration: z
      .number()
      .int()
      .min(1, "MCQ duration must be at least 1 minute")
      .optional(),
    cqMark: z.number().min(0, "CQ mark must be 0 or more").optional(),
    resultStatus: z
      .enum(["pending", "completed", "failed"], {
        required_error: "Result status is required",
      })
      .optional(),
    validTime: z.coerce
      .date({
        errorMap: () => ({ message: "Valid time must be a valid date" }),
      })
      .optional(),
    status: z.enum(["published", "drafted"], {
      required_error: "Status is required",
    }),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
  }),
});

const updateExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1).optional(),
    createdBy: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    examType: z.enum(["MCQ", "CQ", "Fill in the gaps"]).optional(),
    totalQuestion: z.number().int().min(1).optional(),
    positiveMark: z.number().min(0).optional(),
    negativeMark: z.number().min(0).optional(),
    mcqDuration: z.number().min(0).optional(),
    cqMark: z.number().min(0).optional(),
    resultStatus: z.enum(["pending", "completed", "failed"]).optional(),
    validTime: z.coerce
      .date({
        errorMap: () => ({ message: "Valid time must be a valid date" }),
      })
      .optional(),
    status: z.enum(["published", "drafted"]).optional(),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
  }),
});

export const examValidation = {
  createExamSchema,
  updateExamSchema,
};
