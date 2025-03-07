"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealValidations = void 0;
const zod_1 = require("zod");
const mealSchema = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    type: zod_1.z.enum(["breakfast", "lunch", "dinner"]),
    calories: zod_1.z.number().nonnegative(),
    protein: zod_1.z.string().regex(/^\d+g$/, "Protein should be in 'Xg' format"),
    fat: zod_1.z.string().regex(/^\d+g$/, "Fat should be in 'Xg' format"),
    carbs: zod_1.z.string().regex(/^\d+g$/, "Carbs should be in 'Xg' format"),
});
const createMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.enum([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]),
        meals: zod_1.z.array(mealSchema).min(1, "At least one meal is required"),
    }),
});
const updateMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z
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
        meals: zod_1.z.array(mealSchema).optional(),
    }),
});
exports.mealValidations = {
    createMealSchema,
    updateMealSchema,
};
