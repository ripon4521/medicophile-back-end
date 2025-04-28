import { Types } from "mongoose";
import { z } from "zod";
const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId format",
});
 const createBookCategoryValidationSchema = z.object({
  body:z.object({

  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(), 
  createdBy:ObjectIdSchema,
  
})
});


const updateBookCategoryValidationSchema = z.object({
  body:z.object({

    name: z.string().min(1, "Category name is required").optional(),
    description: z.string().optional(), 
        
  })
  });

  export const bookCategoryValidation ={
    createBookCategoryValidationSchema,
    updateBookCategoryValidationSchema
  }