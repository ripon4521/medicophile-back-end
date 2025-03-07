"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealService = void 0;
const meal_model_1 = require("./meal.model");
const createMealIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, meal } = payload;
    try {
        const existingDayMeal = yield meal_model_1.DayMealModel.findOne({ day });
        if (existingDayMeal) {
            existingDayMeal.meals.push(meal);
            yield existingDayMeal.save();
            return existingDayMeal;
        }
        else {
            const newDayMeal = yield meal_model_1.DayMealModel.create({
                day,
                meals: [meal],
            });
            return newDayMeal;
        }
    }
    catch (error) {
        console.error("Error adding meal to day:", error);
        throw error;
    }
});
const getAllMeals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.DayMealModel.find();
    return result;
});
const getMealById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.DayMealModel.findOne({ _id });
    return result;
});
const updateMealById = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield meal_model_1.DayMealModel.findOne({ "meals._id": _id });
        if (!document) {
            console.log("No document found with meal ID:", _id);
            return null;
        }
        const mealIndex = document.meals.findIndex((meal) => meal._id && meal._id.toString() === _id);
        if (mealIndex === -1) {
            console.log("Meal not found in the document:", _id);
            return null;
        }
        Object.keys(payload).forEach((key) => {
            document.meals[mealIndex][key] = payload[key];
        });
        yield document.save();
        const result = yield meal_model_1.DayMealModel.findOne({ "meals._id": _id });
        // console.log(result, "result");
        return result;
    }
    catch (error) {
        console.error("Error updating meal:", error);
        throw error;
    }
});
const deleteMealById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const document = yield meal_model_1.DayMealModel.findOne({ "meals._id": _id });
        if (!document) {
            console.log("No document found with meal ID:", _id);
            return null;
        }
        const result = yield meal_model_1.DayMealModel.findOneAndUpdate({ "meals._id": _id }, { $pull: { meals: { _id: _id } } }, { new: true });
        return result;
    }
    catch (error) {
        console.error("Error deleting meal:", error);
        throw error;
    }
});
exports.mealService = {
    createMealIntoDB,
    getAllMeals,
    getMealById,
    updateMealById,
    deleteMealById,
};
