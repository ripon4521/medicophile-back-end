import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createCourseSchema = z.object({
  body: z.object({
    cover_photo: z.string().min(1, { message: "Cover photo URL is required." }),
    course_title: z.string().min(1, { message: "Course title is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    duration: z.string().min(1, { message: "Duration is required." }),
    preOrder: z.enum(["on", "off"], {
      message: "PreOrder must be either 'on' or 'off'.",
    }),
    course_type: z.enum(["online", "offline"], {
      message: "Course type must be either 'online' or 'offline'.",
    }),
    category: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    expireTime: z.string({ message: "Expire time must be a valid date." }),
    daySchedule: z
      .array(z.string())
      .nonempty({ message: "Day schedule cannot be empty." }),
    timeShedule: z
      .array(z.string())
      .nonempty({ message: "Time schedule cannot be empty." }),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number." }),
    offerPrice: z
      .number()
      .min(0, { message: "Offer price must be a non-negative number." }),
    takeReview: z.enum(["on", "off"], {
      message: "Take review must be either 'on' or 'off'.",
    }),
    status: z.enum(["active", "inactive"], {
      message: "Status must be either 'active' or 'inactive'.",
    }),
    // course_tag: z
    //   .array(z.string())
    //   .nonempty({ message: "At least one course tag is required." }),
  }),
});

const updateCourseSchema = z.object({
  body: z.object({
    cover_photo: z
      .string()
      .min(1, { message: "Cover photo URL is required." })
      .optional(),
    course_title: z
      .string()
      .min(1, { message: "Course title is required." })
      .optional(),
    description: z
      .string()
      .min(1, { message: "Description is required." })
      .optional(),
    duration: z
      .string()
      .min(1, { message: "Duration is required." })
      .optional(),
    preOrder: z
      .enum(["on", "off"], {
        message: "PreOrder must be either 'on' or 'off'.",
      })
      .optional(),
    course_type: z
      .enum(["online", "offline"], {
        message: "Course type must be either 'online' or 'offline'.",
      })
      .optional(),
    category: ObjectIdSchema.optional(),
    createdBy: ObjectIdSchema.optional(),
    expireTime: z
      .date({ message: "Expire time must be a valid date." })
      .optional(),
    daySchedule: z
      .array(z.string())
      .nonempty({ message: "Day schedule cannot be empty." })
      .optional(),
    timeShedule: z
      .array(z.string())
      .nonempty({ message: "Time schedule cannot be empty." })
      .optional(),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number." })
      .optional(),
    offerPrice: z
      .number()
      .min(0, { message: "Offer price must be a non-negative number." })
      .optional(),
    takeReview: z
      .enum(["on", "off"], {
        message: "Take review must be either 'on' or 'off'.",
      })
      .optional(),
    status: z
      .enum(["active", "inactive"], {
        message: "Status must be either 'active' or 'inactive'.",
      })
      .optional(),
    course_tag: z
      .array(z.string())
      .nonempty({ message: "At least one course tag is required." })
      .optional(),
  }),
});

export const courseValidation = {
  updateCourseSchema,
  createCourseSchema,
};
