"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Reusable ObjectId validation
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
// Reusable Enums
const ExamTypeEnum = zod_1.z.enum(["MCQ", "CQ", "Fill in the gaps"], {
    required_error: "Exam type is required",
});
const ResultStatusEnum = zod_1.z.enum(["pending", "completed", "failed"], {
    required_error: "Result status is required",
});
const StatusEnum = zod_1.z.enum(["published", "drafted"], {
    required_error: "Status is required",
});
// Reusable date validator
const dateSchema = zod_1.z
    .preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
    }
    return val;
}, zod_1.z.date({ invalid_type_error: "Invalid date format" }));
// Create Schema
const createExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        examTitle: zod_1.z.string().min(1, "Exam title is required"),
        createdBy: ObjectIdSchema,
        courseId: ObjectIdSchema,
        moduleId: ObjectIdSchema,
        examType: ExamTypeEnum,
        totalQuestion: zod_1.z.number().int().min(1, "Must be at least 1").optional(),
        positiveMark: zod_1.z.number().min(0, "Positive mark must be 0 or more").optional(),
        negativeMark: zod_1.z.number().min(0, "Negative mark must be 0 or more").optional(),
        mcqDuration: zod_1.z.number().int().min(1, "MCQ duration must be at least 1 minute").optional(),
        cqMark: zod_1.z.number().min(0, "CQ mark must be 0 or more").optional(),
        resultStatus: ResultStatusEnum.optional(),
        validTime: zod_1.z.coerce.date({
            errorMap: () => ({ message: "Valid time must be a valid date" }),
        }).optional(),
        status: StatusEnum,
        scheduleDate: dateSchema.optional(),
    }),
});
// Update Schema
const updateExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        examTitle: zod_1.z.string().min(1).optional(),
        createdBy: ObjectIdSchema.optional(),
        courseId: ObjectIdSchema.optional(),
        moduleId: ObjectIdSchema.optional(),
        examType: ExamTypeEnum.optional(),
        totalQuestion: zod_1.z.number().int().min(1).optional(),
        positiveMark: zod_1.z.number().min(0).optional(),
        negativeMark: zod_1.z.number().min(0).optional(),
        mcqDuration: zod_1.z.number().int().min(0).optional(),
        cqMark: zod_1.z.number().min(0).optional(),
        resultStatus: ResultStatusEnum.optional(),
        validTime: zod_1.z.coerce.date({
            errorMap: () => ({ message: "Valid time must be a valid date" }),
        }).optional(),
        status: StatusEnum.optional(),
        scheduleDate: dateSchema.optional(),
    }),
});
exports.examValidation = {
    createExamSchema,
    updateExamSchema,
};
