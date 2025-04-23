import { z } from "zod";

 const createBookCategoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(), 
});


const updateBookCategoryValidationSchema = z.object({
    name: z.string().min(1, "Category name is required").optional(),
    description: z.string().optional(), 
  });

  export const bookCategoryValidation ={
    createBookCategoryValidationSchema,
    updateBookCategoryValidationSchema
  }