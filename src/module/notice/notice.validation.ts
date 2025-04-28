import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createNoticeSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
    createdBy: ObjectIdSchema,
    expiresAt:  z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .refine((date) => date > new Date(), {
      message: "Expiry date must be in the future",
    }).optional(),
    scheduleDate:  z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .refine((date) => date > new Date(), {
      message: "Expiry date must be in the future",
    }).optional()
  }),
});

const updateNoticeSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    message: z.string().min(1, "Message is required").optional(),
    createdBy: ObjectIdSchema.optional(),
    expiresAt: z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .refine((date) => date > new Date(), {
      message: "Expiry date must be in the future",
    }).optional(),
  
    scheduleDate:  z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        return new Date(val);
      }
      return val;
    }, z.date())
    .refine((date) => date > new Date(), {
      message: "Schedule date must be in the future",
    }).optional()
  }),
});

export const noticeValidation = {
  createNoticeSchema,
  updateNoticeSchema,
};
