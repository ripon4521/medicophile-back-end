import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createOfflineBatchSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    courseId: ObjectIdSchema,
  }),
});

const updateOfflineBatchSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
  }),
});

export const offlineBatchValidation = {
  createOfflineBatchSchema,
  updateOfflineBatchSchema,
};
