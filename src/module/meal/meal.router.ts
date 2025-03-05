import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { mealValidations } from './meal.validation';
import { mealController } from './meal.controller';

const mealRouter = express.Router();
mealRouter.post('/create-meal', validateRequest(mealValidations.createMealSchema), mealController.createMeals);

mealRouter.get('/', mealController.getAllMeals);

mealRouter.get('/:id', mealController.getSingleMeal);

mealRouter.patch('/:id', validateRequest(mealValidations.updateMealSchema), mealController.updateMeal);

mealRouter.delete('/:id', mealController.deleteMeal);

export default mealRouter;