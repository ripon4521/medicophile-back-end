import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Optional non-empty string or empty string for optional text fields
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();

const dateSchema = z
  .preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) return new Date(val);
    return val;
  }, z.date({ invalid_type_error: "Invalid date format" })).optional();

const createNotesSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: optionalNonEmptyString,
    createdBy: ObjectIdSchema,
    moduleId: ObjectIdSchema,
    courseId: ObjectIdSchema,
    noteFile: optionalNonEmptyString,
    status: z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
    }),
    scheduleDate: dateSchema,
  }),
});

const updateNotesSchema = z.object({
  body: z.object({
    createdBy: ObjectIdSchema.optional(),
    moduleId: ObjectIdSchema.optional(),
    courseId: ObjectIdSchema.optional(),
    title: optionalNonEmptyString,
    description: optionalNonEmptyString,
    noteFile: optionalNonEmptyString,
    status: z.enum(["Published", "Drafted"]).optional(),
    scheduleDate: dateSchema,
  }),
});

export const noteValidation = {
  createNotesSchema,
  updateNotesSchema,
};
