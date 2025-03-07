"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const meal_validation_1 = require("./meal.validation");
const meal_controller_1 = require("./meal.controller");
const mealRouter = express_1.default.Router();
mealRouter.post('/create-meal', meal_controller_1.mealController.createMeals);
mealRouter.get('/', meal_controller_1.mealController.getAllMeals);
mealRouter.get('/:id', meal_controller_1.mealController.getSingleMeal);
mealRouter.patch('/:id', (0, validateRequest_1.default)(meal_validation_1.mealValidations.updateMealSchema), meal_controller_1.mealController.updateMeal);
mealRouter.delete('/:id', meal_controller_1.mealController.deleteMeal);
exports.default = mealRouter;
