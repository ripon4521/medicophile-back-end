import { object, z } from "zod";
import { Types } from "mongoose";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });
export const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.array(z.string().min(1, "Answer can't be empty")).nonempty(),
});

 const createCourseDetailsZodSchema = z.object({
 body:z.object({

  courseId:ObjectIdSchema,
  isCourseExist: z.array(z.string().min(1)).nonempty("At least one course must exist"),
  syllabus: z.array(faqSchema).optional(),
  courseDetails: z.array(faqSchema).optional(),
  instructors: z.array(z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId for instructor",
  })),
})
});



const updateCourseDetailsZodSchema = z.object({
    body:z.object({
     isCourseExist: z.array(z.string().min(1)).nonempty("At least one course must exist").optional(),
     syllabus: z.array(faqSchema).optional(),
     courseDetails: z.array(faqSchema).optional(),
     instructors: z.array(z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
       message: "Invalid ObjectId for instructor",
     })).optional(),
   })
   });


   export const courseDetailsValidation = {
    createCourseDetailsZodSchema,
    updateCourseDetailsZodSchema
   }