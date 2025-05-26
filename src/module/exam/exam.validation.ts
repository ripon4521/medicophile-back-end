import { z } from "zod";
import { Types } from "mongoose";

// Reusable ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Reusable Enums
const ExamTypeEnum = z.enum(["MCQ", "CQ", "Fill in the gaps"], {
  required_error: "Exam type is required",
});

const ResultStatusEnum = z.enum(["pending", "completed", "failed"], {
  required_error: "Result status is required",
});

const StatusEnum = z.enum(["published", "drafted"], {
  required_error: "Status is required",
});

// Reusable date validator
const dateSchema = z
  .preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date({ invalid_type_error: "Invalid date format" }));

// Create Schema
const createExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1, "Exam title is required"),
    createdBy: ObjectIdSchema,
    courseId: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    examType: ExamTypeEnum,
    totalQuestion: z.number().int().min(1, "Must be at least 1").optional(),
    positiveMark: z.number().min(0, "Positive mark must be 0 or more").optional(),
    negativeMark: z.number().min(0, "Negative mark must be 0 or more").optional(),
    mcqDuration: z.number().int().min(1, "MCQ duration must be at least 1 minute").optional(),
    cqMark: z.number().min(0, "CQ mark must be 0 or more").optional(),
    resultStatus: ResultStatusEnum.optional(),
    validTime: z.number().optional(),
    status: StatusEnum,
    scheduleDate: dateSchema.optional(),
  }),
});

// Update Schema
const updateExamSchema = z.object({
  body: z.object({
    examTitle: z.string().min(1).optional(),
    createdBy: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    examType: ExamTypeEnum.optional(),
    totalQuestion: z.number().int().min(1).optional(),
    positiveMark: z.number().min(0).optional(),
    negativeMark: z.number().min(0).optional(),
    mcqDuration: z.number().int().min(0).optional(),
    cqMark: z.number().min(0).optional(),
    resultStatus: ResultStatusEnum.optional(),
     validTime: z.number().optional(),
    status: StatusEnum.optional(),
    scheduleDate: dateSchema.optional(),
  }),
});

export const examValidation = {
  createExamSchema,
  updateExamSchema,
};
