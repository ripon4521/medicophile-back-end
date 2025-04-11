

import { z } from "zod";
import mongoose from "mongoose";

 const createMediaZodSchema = z.object({
    body:z.object({

  slug: z.string({ required_error: "Slug is required" })
    .min(1, { message: "Slug cannot be empty" }),

  title: z.string({ required_error: "Title is required" })
    .min(1, { message: "Title cannot be empty" }),

  media: z.string({ required_error: "Media URL is required" })
    .url({ message: "Media must be a valid URL" }),

  createdBy: z.string({ required_error: "CreatedBy is required" })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid CreatedBy ObjectId",
    }),
        
})
});


const updateMediaZodSchema = z.object({
    body:z.object({
   
    slug: z.string({ required_error: "Slug is required" })
      .min(1, { message: "Slug cannot be empty" }).optional(),
  
    title: z.string({ required_error: "Title is required" })
      .min(1, { message: "Title cannot be empty" }).optional(),
  
    media: z.string({ required_error: "Media URL is required" })
      .url({ message: "Media must be a valid URL" }).optional(),
  
    createdBy: z.string({ required_error: "CreatedBy is required" })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid CreatedBy ObjectId",
      }).optional(),
       
    })
  });


  export const mediaValidation = {
    createMediaZodSchema,
    updateMediaZodSchema
  }