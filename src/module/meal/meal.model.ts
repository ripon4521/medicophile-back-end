import mongoose, { Schema, model, Document } from "mongoose";
import { IMeal } from "./meal.interface";


const MealSchema = new Schema<IMeal>({
    day: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    type: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: String, required: true },
    fat: { type: String, required: true },
    carbs: { type: String, required: true },
  });
  

export const MealModel = model<IMeal>("Meal", MealSchema);
