"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createLectureSchema = zod_1.z.object({
  body: zod_1.z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    title: zod_1.z.string().min(1, "Title is required"),
    server: zod_1.z.string().min(1, "Server is required"),
    videoId: zod_1.z.string().url("Invalid video URL"),
    duration: zod_1.z.number().min(1, "Duration must be greater than 0"),
    isFree: zod_1.z.boolean(),
    status: zod_1.z.enum(["Published", "Drafted"]),
    scheduleDate: zod_1.z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, zod_1.z.date())
      .optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
  }),
});
const updateLectureSchema = zod_1.z.object({
  body: zod_1.z.object({
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    title: zod_1.z.string().min(1, "Title is required").optional(),
    server: zod_1.z.string().min(1, "Server is required").optional(),
    videoId: zod_1.z.string().url("Invalid video URL").optional(),
    duration: zod_1.z
      .number()
      .min(1, "Duration must be greater than 0")
      .optional(),
    isFree: zod_1.z.boolean().optional(),
    scheduleDate: zod_1.z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, zod_1.z.date())
      .optional(),
    status: zod_1.z.enum(["Published", "Drafted"]).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
  }),
});
exports.lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};
