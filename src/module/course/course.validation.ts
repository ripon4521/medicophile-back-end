import { z } from "zod";
import { Types } from "mongoose";

// ObjectId Schema
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const optionalObjectId = z.union([ObjectIdSchema, z.literal("")]).optional();

// Optional helpers that allow empty string
const optionalString = (msg: string) =>
  z.union([z.string().min(1, msg), z.literal("")]).optional();
const optionalNumber = (msg: string) =>
  z.union([z.number(), z.literal("")]).optional();
const optionalArray = () =>
  z.union([z.array(z.string()).nonempty(), z.literal("")]).optional();

const requiredString = (msg: string) => z.string().min(1, { message: msg });
const requiredNumber = (msg: string) => z.number({ required_error: msg });

// Create Schema
const createCourseSchema = z.object({
  body: z.object({
    cover_photo: optionalString("Cover photo URL is required."),
    prefix:optionalString("Prefix is requried"),
    course_title: requiredString("Course title is required."),
    description: requiredString("Description is required."),
    duration: requiredString("Duration is required."),
    preOrder: z.enum(["on", "off"], {
      message: "PreOrder must be either 'on' or 'off'.",
    }),
    course_type: z.enum(["online", "offline"], {
      message: "Course type must be either 'online' or 'offline'.",
    }),
    category: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    expireTime: requiredString("Expire time is required."),
    daySchedule: z
      .array(z.string())
      .nonempty({ message: "Day schedule cannot be empty." }),
    timeShedule: z
      .array(z.string())
      .nonempty({ message: "Time schedule cannot be empty." }),
    price: requiredNumber("Price must be a non-negative number."),
    offerPrice: optionalNumber("Offer price must be a non-negative number."),
    takeReview: z
      .enum(["on", "off"], {
        message: "Take review must be either 'on' or 'off'.",
      })
      .optional(),
    status: z.enum(["active", "inactive"], {
      message: "Status must be either 'active' or 'inactive'.",
    }),
  }),
});

// Update Schema
const updateCourseSchema = z.object({
  body: z.object({
    cover_photo: optionalString("Cover photo URL is required."),
    prefix:optionalString("Prefix is requeried"),
    course_title: optionalString("Course title is required."),
    description: optionalString("Description is required."),
    duration: optionalString("Duration is required."),
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
    category: optionalObjectId,
    createdBy: optionalObjectId,
    expireTime: optionalString("Expire time must be a valid date."),
    daySchedule: optionalArray(),
    timeShedule: optionalArray(),
    price: optionalNumber("Price must be a non-negative number."),
    offerPrice: optionalNumber("Offer price must be a non-negative number."),
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
    course_tag: optionalArray(),
  }),
});

export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
};
