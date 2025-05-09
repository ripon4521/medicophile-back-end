import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createLectureSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    title: z.string().min(1, "Title is required"),
    server: z.string().min(1, "Server is required"),
    videoId: z.string().url("Invalid video URL"),
    duration: z.number().min(1, "Duration must be greater than 0"),
    isFree: z.boolean().optional(),
    status: z.enum(["Published", "Drafted"]),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const updateLectureSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    title: z.string().min(1, "Title is required").optional(),
    server: z.string().min(1, "Server is required").optional(),
    videoId: z.string().url("Invalid video URL").optional(),
    duration: z.number().min(1, "Duration must be greater than 0").optional(),
    isFree: z.boolean().optional(),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) {
          return new Date(val);
        }
        return val;
      }, z.date())
      .optional(),
    status: z.enum(["Published", "Drafted"]).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};
