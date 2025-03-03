import mongoose, { Schema, model, Document } from "mongoose";

interface INutrition {
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
}

interface IMealItem {
  name: string;
  price: number;
  nutrition: INutrition;
}

export interface IMeal extends Document {
  day: string;
  meals: IMealItem[];
}

const NutritionSchema = new Schema<INutrition>({
  calories: { type: Number, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  carbs: { type: String, required: true },
});

const MealItemSchema = new Schema<IMealItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  nutrition: { type: NutritionSchema, required: true },
});

const MealSchema = new Schema<IMeal>({
  day: { type: String, required: true },
  meals: { type: [MealItemSchema], required: true },
});

export const MealModel = model<IMeal>("Meal", MealSchema);
