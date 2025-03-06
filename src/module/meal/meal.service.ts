import { IMeal } from "./meal.interface"
import { DayMealModel } from "./meal.model";



const createMealIntoDB =async (payload:IMeal) => {
    const result = await DayMealModel.create(payload);
    return result;
}

const getAllMeals = async () => {
    const result = await DayMealModel.find();
    return result;
}

const getMealById = async (_id: string) => {
    const result = await DayMealModel.findOne({_id});
    return result;
}

const updateMealById = async (_id: string, payload: Partial<IMeal>) => {
    const result = await DayMealModel.findOneAndUpdate({_id}, payload, { new: true });
    return result;
}

const deleteMealById = async (_id: string) => {
    const result = await DayMealModel.findOneAndDelete({_id});
    return result;
}

export const mealService = {
    createMealIntoDB,
    getAllMeals,
    getMealById,
    updateMealById,
    deleteMealById,
 
}