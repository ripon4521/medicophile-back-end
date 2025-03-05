import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mealService } from "./meal.service";

const createMeals = catchAsync(async(req, res) => {
    const result = await mealService.createMealIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Meal Created successfully',
        data: result,
    });
});

const getAllMeals = catchAsync(async (req, res) => {
    const result = await mealService.getAllMeals();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Meals fetched successfully',
        data: result,
    });
});

const getSingleMeal = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await mealService.getMealById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Meal fetched successfully',
        data: result,
    });
});

const updateMeal = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await mealService.updateMealById(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Meal updated successfully',
        data: result,
    });
});

const deleteMeal = catchAsync(async (req, res) => {

    const { id } = req.params;
    const result = await mealService.deleteMealById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Meal deleted successfully',
        data: result,
    });
});

export const mealController = {
    createMeals,
    getAllMeals,
    getSingleMeal,
    updateMeal,
    deleteMeal,
}