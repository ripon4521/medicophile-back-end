import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

// Helper: Accepts either a non-empty string or an empty string (for optional fields)
const optionalNonEmptyString = z.union([z.string().min(1), z.literal("")]).optional();
const optionalURL = z.union([z.string().url({ message: "Link must be a valid URL" }), z.literal("")]).optional();

const createliveClassZodSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    title: z.string({ required_error: "Title is required" }).min(1, { message: "Title cannot be empty" }),
    description: optionalNonEmptyString,
    link: z.string().url({ message: "Link must be a valid URL" }),
    status: z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be either 'Published' or 'Drafted'",
    }),
  }),
});

const updateliveClassZodSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    title: optionalNonEmptyString,
    description: optionalNonEmptyString,
    link: optionalURL,
    status: z.enum(["Published", "Drafted"], {
      invalid_type_error: "Status must be either 'Published' or 'Drafted'",
    }).optional(),
  }),
});

export const liveClassValidation = {
  createliveClassZodSchema,
  updateliveClassZodSchema,
};
