import { z } from "zod";

 const createMealSchema = z.object({
    body:z.object({

   
  day: z.string(),
  meals: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      nutrition: z.object({
        calories: z.number(),
        protein: z.string(),
        fat: z.string(),
        carbs: z.string(),
      }),
    })
),
})
});

 const updateMealSchema = z.object({
    body:z.object({

   
  day: z.string().optional(),
  meals: z.array(
    z.object({
      name: z.string().optional(),
      price: z.number().optional(),
      nutrition: z.object({
        calories: z.number().optional(),
        protein: z.string().optional(),
        fat: z.string().optional(),
        carbs: z.string().optional(),
      }).optional(),
    })
),
})
});



export const mealValidations = {
    createMealSchema,
    updateMealSchema,
}