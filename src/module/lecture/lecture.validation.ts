import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional non-empty string or empty string (for optional fields)
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
// Optional URL or empty string
const optionalURL = z.union([z.string().url({ message: "Invalid video URL" }), z.literal("")]).optional();

const createLectureSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    title: z.string().min(1, { message: "Title is required" }),
    server: z.string().min(1, { message: "Server is required" }),
    videoId: optionalNonEmptyString,
    duration: z.number().min(1, { message: "Duration must be greater than 0" }),
    isFree: z.boolean().optional(),
    status: z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
    }),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) return new Date(val);
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
    title: optionalNonEmptyString,
    server: optionalNonEmptyString,
    videoId: optionalNonEmptyString,
    duration: z.number().min(1, { message: "Duration must be greater than 0" }).optional(),
    isFree: z.boolean().optional(),
    status: z.enum(["Published", "Drafted"]).optional(),
    scheduleDate: z
      .preprocess((val) => {
        if (typeof val === "string" || val instanceof Date) return new Date(val);
        return val;
      }, z.date())
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};
