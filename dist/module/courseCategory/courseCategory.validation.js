"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseCategoryValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ObjectIdSchema = zod_1.z
  .string()
  .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
const createCourseCategorySchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    cover_photo: zod_1.z.string().url("Invalid cover photo URL"),
    createdBy: ObjectIdSchema,
  }),
});
const updateCourseCategorySchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").optional(),
    cover_photo: zod_1.z.string().url("Invalid cover photo URL").optional(),
  }),
});
exports.courseCategoryValidation = {
  createCourseCategorySchema,
  updateCourseCategorySchema,
};
