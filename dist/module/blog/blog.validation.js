"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createBlogZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" }),
    description: zod_1.z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" }),
    categoryId: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    tags: zod_1.z
      .array(zod_1.z.string({ required_error: "Tags must be strings" }))
      .min(1, { message: "At least one tag is required" })
      .optional(),
    status: zod_1.z.enum(["Published", "Drafted"], {
      required_error: "Status is required",
      invalid_type_error: "Status must be either 'Published' or 'Drafted'",
    }),
    coverPhoto: zod_1.z
      .string({ required_error: "Cover photo URL is required" })
      .url({ message: "Cover photo must be a valid URL" })
      .optional(),
  }),
});
const updateBlogZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" })
      .optional(),
    description: zod_1.z
      .string({ required_error: "Description is required" })
      .min(1, { message: "Description cannot be empty" })
      .optional(),
    categoryId: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    tags: zod_1.z
      .array(zod_1.z.string({ required_error: "Tags must be strings" }))
      .min(1, { message: "At least one tag is required" })
      .optional(),
    status: zod_1.z
      .enum(["Published", "Drafted"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be either 'Published' or 'Drafted'",
      })
      .optional(),
    coverPhoto: zod_1.z
      .string({ required_error: "Cover photo URL is required" })
      .url({ message: "Cover photo must be a valid URL" })
      .optional(),
  }),
});
exports.blogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
