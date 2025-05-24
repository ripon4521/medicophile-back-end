import { z } from "zod";
import { Types } from "mongoose";

// Helper reusable ObjectId validation
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helper reusable enums
const StatusEnum = z.enum(["Published", "Drafted"], {
  required_error: "Status is required",
});

// Optional string allowing empty string or min length 1
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

// Optional URL allowing empty string or valid URL
const optionalURL = z.union([z.string().url({ message: "Invalid URL" }), z.literal("")]).optional();

// Optional boolean
const optionalBoolean = z.boolean().optional();

// Date preprocessor
const dateSchema = z.preprocess((val) => {
  if (typeof val === "string" || val instanceof Date) return new Date(val);
  return val;
}, z.date({ invalid_type_error: "Invalid date format" })).optional();

const createLectureSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    title: z.string().min(1, { message: "Title is required" }),
    server: z.string().min(1, { message: "Server is required" }),
    videoId: z.string().url({ message: "Invalid video URL" }),
    duration: z.number().min(1, { message: "Duration must be greater than 0" }),
    isFree: optionalBoolean,
    status: StatusEnum,
    scheduleDate: dateSchema,
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
    videoId: optionalURL,
    duration: z.number().min(1, { message: "Duration must be greater than 0" }).optional(),
    isFree: optionalBoolean,
    status: StatusEnum.optional(),
    scheduleDate: dateSchema,
    tags: z.array(z.string()).optional(),
  }),
});

export const lectureValidation = {
  createLectureSchema,
  updateLectureSchema,
};
