import { z } from "zod";

const createCourseSchema = z.object({
  body: z.object({
    course_title: z.string().min(1, { message: "Course title is required" }),
    totalAdmited: z.number({ message: "Total admitted must be a number" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    preOrder: z.enum(["on", "off"], { message: "Pre-order must be 'on' or 'off'" }),
    takeReview: z.enum(["on", "off"], { message: "Take review must be 'on' or 'off'" }),
    course_type: z.enum(["online", "offline"], { message: "Course type must be 'online' or 'offline'" }),
    price: z.number()
      .positive({ message: "Price must be a positive number" })
      .min(1, { message: "Price must be at least 1" }),
    offerPrice: z.number()
      .positive({ message: "Offer price must be a positive number" })
      .min(1, { message: "Offer price must be at least 1" }),
    shedule: z.string().min(1, { message: "Schedule is required" }).optional(),
    status: z.enum(["active", "unactive"], { message: "Status must be 'active' or 'unactive'" }),
  })
});


  const updateCourseSchema = z.object({
    body:z.object({
      course_code: z.string().min(1, { message: "Course code is required" }).optional(),
    course_title: z.string().min(1, { message: "Course title is required" }).optional(),
    totalAdmited: z.number({ message: "Total admitted must be a number" }).optional(),
    duration: z.string().min(1, { message: "Duration is required" }).optional(),
    category: z.string().min(1, { message: "category is required" }).optional(),
    preOrder: z.enum(["on", "off"], { message: "Pre-order must be 'on' or 'off'" }).optional(),
    takeReview: z.enum(["on", "off"], { message: "Take review must be 'on' or 'off'" }).optional(),
    course_type: z.enum(["online", "offline"], { message: "Course type must be 'online' or 'offline'" }).optional(),
    price: z.number()
      .positive({ message: "Price must be a positive number" })
      .min(1, { message: "Price must be at least 1" }).optional(),
    offerPrice: z.number()
      .positive({ message: "Offer price must be a positive number" })
      .min(1, { message: "Offer price must be at least 1" }).optional(),
    shedule: z.string().min(1, { message: "Schedule is required" }).optional(),
    status: z.enum(["active", "unactive"], { message: "Status must be 'active' or 'unactive'" }).optional(),
  })
  });

 export const courseValidation = {
    createCourseSchema,
    updateCourseSchema,
  }