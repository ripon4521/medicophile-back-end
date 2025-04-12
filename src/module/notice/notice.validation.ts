

import { z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });


 const createNoticeSchema = z.object({
  body:z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  createdBy: ObjectIdSchema,
  expiresAt: z.date().refine(date => date > new Date(), "Expiry date must be in the future"),
})
});


const updateNoticeSchema = z.object({
    body:z.object({
    title: z.string().min(1, "Title is required").optional(),
    message: z.string().min(1, "Message is required").optional(),
    createdBy: ObjectIdSchema.optional(),
    expiresAt: z.date().refine(date => date > new Date(), "Expiry date must be in the future").optional(),
  })
  });
  


  export const noticeValidation = {
    createNoticeSchema,
    updateNoticeSchema
  }