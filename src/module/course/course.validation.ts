import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
const createCourseSchema = z.object({
  body: z.object({
    course_title: z.string().min(1, { message: "Course title is required" }),
    cover_photo: z.string().min(1, { message: "cover photo  is required" }).optional(),
    totalAdmited: z.number({ message: "Total admitted must be a number" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    category: ObjectIdSchema,
    preOrder: z.enum(["on", "off"], {
      message: "Pre-order must be 'on' or 'off'",
    }),
    takeReview: z.enum(["on", "off"], {
      message: "Take review must be 'on' or 'off'",
    }),
    course_type: z.enum(["online", "offline"], {
      message: "Course type must be 'online' or 'offline'",
    }),
    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .min(1, { message: "Price must be at least 1" }),
    offerPrice: z
      .number()
      .positive({ message: "Offer price must be a positive number" })
      .min(1, { message: "Offer price must be at least 1" }),
    launchingDate: z.string().min(1, { message: "Launching Date is required" }),
    course_tag: z.string().min(1, { message: "Course Tag is required" }).optional(),
    status: z.enum(["active", "inactive"], {
      message: "Status must be 'active' or 'unactive'",
    }),
  }),
});

const updateCourseSchema = z.object({
  body: z.object({
    course_code: z
      .string()
      .min(1, { message: "Course code is required" })
      .optional(),
    cover_photo: z
      .string()
      .min(1, { message: "cover photo  is required" })
      .optional(),
    course_title: z
      .string()
      .min(1, { message: "Course title is required" })
      .optional(),
    totalAdmited: z
      .number({ message: "Total admitted must be a number" })
      .optional(),
    duration: z.string().min(1, { message: "Duration is required" }).optional(),
    category:ObjectIdSchema.optional(),
    preOrder: z
      .enum(["on", "off"], { message: "Pre-order must be 'on' or 'off'" })
      .optional(),
    takeReview: z
      .enum(["on", "off"], { message: "Take review must be 'on' or 'off'" })
      .optional(),
    course_type: z
      .enum(["online", "offline"], {
        message: "Course type must be 'online' or 'offline'",
      })
      .optional(),
    price: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .min(1, { message: "Price must be at least 1" })
      .optional(),
    offerPrice: z
      .number()
      .positive({ message: "Offer price must be a positive number" })
      .min(1, { message: "Offer price must be at least 1" })
      .optional(),
    launchingDate: z
      .string()
      .min(1, { message: "Launching Date is required" })
      .optional(),
    course_tag: z
      .string()
      .min(1, { message: "Course Tag is required" })
      .optional(),
    status: z
      .enum(["active", "inactive"], {
        message: "Status must be 'active' or 'unactive'",
      })
      .optional(),
  }),
});

export const courseValidation = {
  createCourseSchema,
  updateCourseSchema,
};
