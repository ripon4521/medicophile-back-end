import mongoose, { Schema, model, Document } from "mongoose";
import { IMeal } from "./meal.interface";

interface IDayMeal extends Document {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  meals: IMeal[];
  createdAt?: Date;
  updatedAt?: Date;
}

const MealSchema = new Schema<IMeal>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    type: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: String, required: true },
    fat: { type: String, required: true },
    carbs: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true } // Add timestamps
);

const DayMealSchema = new Schema<IDayMeal>(
  {
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      required: true,
    },
    meals: { type: [MealSchema], required: true },
  },
  { timestamps: true } // Add timestamps
);

export const DayMealModel = model<IDayMeal>("DayMeal", DayMealSchema);
