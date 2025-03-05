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
    const result = yield meal_model_1.MealModel.create(payload);
    return result;
});
const getAllMeals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.MealModel.find();
    return result;
});
const getMealById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.MealModel.findOne({ _id });
    return result;
});
const updateMealById = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.MealModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteMealById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.MealModel.findOneAndDelete({ _id });
    return result;
});
exports.mealService = {
    createMealIntoDB,
    getAllMeals,
    getMealById,
    updateMealById,
    deleteMealById,
};
