import { IMeal } from "./meal.interface"
import { MealModel } from "./meal.model"


const createMealIntoDB =async (payload:IMeal) => {
    const result = await MealModel.create(payload);
    return result;
}

const getAllMeals = async () => {
    const result = await MealModel.find();
    return result;
}

const getMealById = async (_id: string) => {
    const result = await MealModel.findOne({_id});
    return result;
}

const updateMealById = async (_id: string, payload: Partial<IMeal>) => {
    const result = await MealModel.findOneAndUpdate({_id}, payload, { new: true });
    return result;
}

const deleteMealById = async (_id: string) => {
    const result = await MealModel.findOneAndDelete({_id});
    return result;
}

export const mealService = {
    createMealIntoDB,
    getAllMeals,
    getMealById,
    updateMealById,
    deleteMealById,
 
}