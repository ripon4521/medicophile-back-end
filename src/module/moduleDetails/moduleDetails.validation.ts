import { z } from "zod";
import { Types } from "mongoose";

const ObjectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});

const createIModuleDetailsSchema = z.object({
  body: z.object({
    courseId: ObjectId,
    moduleId: ObjectId,
    content_type: z.enum(["Lecture", "Notes", "Exam"]),
    contentId: ObjectId,
    status: z.enum(["published", "drafted"]),
 
  }),
});

const updateIModuleDetailsSchema = z.object({
  body: z.object({
    courseId: ObjectId.optional(),
    moduleId: ObjectId.optional(),
    content_type: z.enum(["Lecture", "Notes", "Exam"]).optional(),
    contentId: ObjectId.optional(),
    status: z.enum(["published", "drafted"]).optional(),
   
  }),
});

export const moduleDetailsValidation = {
  createIModuleDetailsSchema,
  updateIModuleDetailsSchema,
};
