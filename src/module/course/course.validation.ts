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
  z.union([z.array(z.string()), z.literal("")]).optional();

const requiredString = (msg: string) => z.string().min(1, { message: msg });
const requiredNumber = (msg: string) => z.number({ required_error: msg });

// ✅ Time Schedule Schema (array of objects with day:string[] pair)
const timeScheduleSchema = z.array(
  z.record(
    z.enum([
      "saturday",
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
    ]),
    z.array(z.string().min(1))
  )
);

// ✅ Flexible Time Schedule for update (allows "", [] or valid schedule)
const flexibleTimeScheduleSchema = z.union([
  timeScheduleSchema,
  z.array(z.any()), // Accepts empty array
  z.literal(""),
]);

// Create Schema
const createCourseSchema = z.object({
  body: z.object({
    cover_photo: optionalString("Cover photo URL is required."),
    prefix: optionalString("Prefix is required"),
    course_title: requiredString("Course title is required."),
    description: requiredString("Description is required."),
    duration: requiredString("Duration is required."),
    daySchedule: optionalArray(),
    preOrder: z.enum(["on", "off"], {
      message: "PreOrder must be either 'on' or 'off'.",
    }),
    course_type: z.enum(["online", "offline"], {
      message: "Course type must be either 'online' or 'offline'.",
    }),
    category: ObjectIdSchema,
    createdBy: ObjectIdSchema,
    expireTime: requiredString("Expire time is required."),
    timeShedule: timeScheduleSchema, // keeping strict validation in create
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
    prefix: optionalString("Prefix is required"),
    course_title: optionalString("Course title is required."),
     daySchedule: optionalArray(),
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
    timeShedule: flexibleTimeScheduleSchema.optional(), // ✅ updated here
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
