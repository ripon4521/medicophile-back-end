import { z } from "zod";

const mealSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  category: z.string(),
  type: z.enum(["breakfast", "lunch", "dinner"]),
  calories: z.number().nonnegative(),
  protein: z.string().regex(/^\d+g$/, "Protein should be in 'Xg' format"),
  fat: z.string().regex(/^\d+g$/, "Fat should be in 'Xg' format"),
  carbs: z.string().regex(/^\d+g$/, "Carbs should be in 'Xg' format"),
});

const createMealSchema = z.object({
  body: z.object({
    day: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    meals: z.array(mealSchema).min(1, "At least one meal is required"),
  }),
});

const updateMealSchema = z.object({
  body: z.object({
    day: z
      .enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
      .optional(),
    meals: z.array(mealSchema).optional(),
  }),
});

export const mealValidations = {
  createMealSchema,
  updateMealSchema,
};
