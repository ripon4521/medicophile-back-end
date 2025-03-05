"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealValidations = void 0;
const zod_1 = require("zod");
const createMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.string(),
        name: zod_1.z.string(),
        price: zod_1.z.number().positive(),
        category: zod_1.z.string(),
        type: zod_1.z.enum(["breakfast", "lunch", "dinner"]),
        calories: zod_1.z.number().nonnegative(),
        protein: zod_1.z.string(),
        fat: zod_1.z.string(),
        carbs: zod_1.z.string(),
    })
});
const updateMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        category: zod_1.z.string().optional(),
        type: zod_1.z.enum(["breakfast", "lunch", "dinner"]).optional(),
        calories: zod_1.z.number().nonnegative().optional(),
        protein: zod_1.z.string().optional(),
        fat: zod_1.z.string().optional(),
        carbs: zod_1.z.string().optional(),
    })
});
exports.mealValidations = {
    createMealSchema,
    updateMealSchema,
};
