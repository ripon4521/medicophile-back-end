"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqMarkingValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createCqMarkingSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    questionId: ObjectIdSchema,
    score: zod_1.z.number().min(0, "Score must be a positive number"),
    comment: zod_1.z.string().optional(),
  }),
});
const updateCqMarkingSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    questionId: ObjectIdSchema.optional(),
    score: zod_1.z
      .number()
      .min(0, "Score must be a positive number")
      .optional(),
    comment: zod_1.z.string().optional(),
  }),
});
exports.cqMarkingValidation = {
  createCqMarkingSchema,
  updateCqMarkingSchema,
};
