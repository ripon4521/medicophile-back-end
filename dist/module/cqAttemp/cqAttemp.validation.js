"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqAttempsValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createCqAttemptValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema,
    examId: ObjectIdSchema,
    checkedBy: ObjectIdSchema,
    submitedPdf: zod_1.z.string().url({ message: "Must be a valid PDF URL" }),
    score: zod_1.z.number().min(0, "Score must be a non-negative number"),
    submissionStatus: zod_1.z.enum(["In Time", "Late"]),
    startTime: zod_1.z.coerce.date(),
    submittedTime: zod_1.z.coerce.date(),
  }),
});
const updateCqAttemptValidationSchema = zod_1.z.object({
  body: zod_1.z.object({
    studentId: ObjectIdSchema.optional(),
    examId: ObjectIdSchema.optional(),
    checkedBy: ObjectIdSchema.optional(),
    submitedPdf: zod_1.z
      .string()
      .url({ message: "Must be a valid PDF URL" })
      .optional(),
    score: zod_1.z
      .number()
      .min(0, "Score must be a non-negative number")
      .optional(),
    submissionStatus: zod_1.z.enum(["In Time", "Late"]).optional(),
    startTime: zod_1.z.coerce.date().optional(),
    submittedTime: zod_1.z.coerce.date().optional(),
  }),
});
exports.cqAttempsValidation = {
  createCqAttemptValidationSchema,
  updateCqAttemptValidationSchema,
};
