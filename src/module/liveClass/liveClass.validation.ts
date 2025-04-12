import { Types } from "mongoose";
import { z } from "zod";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createliveClassZodSchema = z.object({
  body: z.object({
    courseId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" }),
    description: z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" })
      .optional(),
    link: z.string().url("Url must be string"),
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
    title: z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" })
      .optional(),
    description: z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" })
      .optional(),
    link: z.string().url("Url must be string").optional(),
    status: z
      .enum(["Published", "Drafted"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be either 'Published' or 'Drafted'",
      })
      .optional(),
  }),
});

export const liveClassValidation = {
  createliveClassZodSchema,
  updateliveClassZodSchema,
};
