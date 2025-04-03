"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
const createExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        examTitle: zod_1.z.string().min(1),
        createdBy: ObjectIdSchema,
        courseId: ObjectIdSchema,
        moduleId: ObjectIdSchema,
        examType: zod_1.z.enum(["MCQ", "CQ", "Fill in the gaps"]),
        totalQuestion: zod_1.z.number().int().min(1),
        positiveMark: zod_1.z.number().min(0),
        negativeMark: zod_1.z.number().min(0),
        mcqDuration: zod_1.z.number().min(0),
        cqMark: zod_1.z.number().min(0),
        resultStatus: zod_1.z.enum(["pending", "completed", "failed"]),
        validTime: zod_1.z.string(),
        status: zod_1.z.enum(["published", "drafted"]),
        deletedAt: zod_1.z.union([zod_1.z.date().optional(), zod_1.z.null()]),
        isDeleted: zod_1.z.boolean(),
    }),
});
const updateExamSchema = zod_1.z.object({
    body: zod_1.z.object({
        examTitle: zod_1.z.string().min(1).optional(),
        createdBy: ObjectIdSchema.optional(),
        courseId: ObjectIdSchema.optional(),
        moduleId: ObjectIdSchema.optional(),
        examType: zod_1.z.enum(["MCQ", "CQ", "Fill in the gaps"]).optional(),
        totalQuestion: zod_1.z.number().int().min(1).optional(),
        positiveMark: zod_1.z.number().min(0).optional(),
        negativeMark: zod_1.z.number().min(0).optional(),
        mcqDuration: zod_1.z.number().min(0).optional(),
        cqMark: zod_1.z.number().min(0).optional(),
        resultStatus: zod_1.z.enum(["pending", "completed", "failed"]).optional(),
        validTime: zod_1.z.string().optional(),
        status: zod_1.z.enum(["published", "drafted"]).optional(),
        deletedAt: zod_1.z.union([zod_1.z.date().optional(), zod_1.z.null()]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.examValidation = {
    createExamSchema,
    updateExamSchema,
};
