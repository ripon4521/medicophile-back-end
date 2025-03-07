"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayMealModel = void 0;
const mongoose_1 = require("mongoose");
const MealSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    type: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    calories: { type: Number, required: true, min: 0 },
    protein: { type: String, required: true },
    fat: { type: String, required: true },
    carbs: { type: String, required: true },
    available: { type: Boolean, default: true },
}, { timestamps: true } // Add timestamps
);
const DayMealSchema = new mongoose_1.Schema({
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
    },
    meals: { type: [MealSchema], required: true },
}, { timestamps: true } // Add timestamps
);
exports.DayMealModel = (0, mongoose_1.model)("DayMeal", DayMealSchema);
