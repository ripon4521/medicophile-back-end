"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealModel = void 0;
const mongoose_1 = require("mongoose");
const MealSchema = new mongoose_1.Schema({
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
exports.MealModel = (0, mongoose_1.model)("Meal", MealSchema);
