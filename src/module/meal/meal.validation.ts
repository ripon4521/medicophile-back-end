import { z } from "zod";

 const createMealSchema = z.object({
    body:z.object({
        day: z.string(),
        name: z.string(),
        price: z.number().positive(),
        category: z.string(),
        type: z.enum(["breakfast", "lunch", "dinner"]),
        calories: z.number().nonnegative(),
        protein: z.string(),
        fat: z.string(),
        carbs: z.string(),
})
});

 const updateMealSchema = z.object({
    body:z.object({
        day: z.string().optional(),
  name: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.string().optional(),
  type: z.enum(["breakfast", "lunch", "dinner"]).optional(),
  calories: z.number().nonnegative().optional(),
  protein: z.string().optional(),
  fat: z.string().optional(),
  carbs: z.string().optional(),
})
});



export const mealValidations = {
    createMealSchema,
    updateMealSchema,
}