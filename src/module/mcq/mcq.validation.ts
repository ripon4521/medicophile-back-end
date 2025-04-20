import { Types } from "mongoose";
import { z } from "zod";


const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});



const mcqQuestionSchema = z.object({
    examId: ObjectIdSchema, 
    question: z.string().min(1, "Question is required"), 
    questionImg: z.string().min(1, "Question image is required").optional(), 
    options: z.array(z.string()).min(2, "There must be at least two options"), 
    correctAnswer: z.string().min(1, "Correct answer is required"), 
    explaination: z.string().min(1, "Explanation is required").optional(), 
    tags: z.array(z.string()).min(1, "At least one tag is required").optional(), 
    subject: z.string().min(1, "Subject is required").optional(), 
    questionType: z.string().min(1, "Question type is required").optional(), 
    questionCategory: z.string().min(1, "Question category is required").optional(), 
    insertBy: ObjectIdSchema,

  });