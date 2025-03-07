import { IMeal } from "./meal.interface"
import { DayMealModel } from "./meal.model";

const createMealIntoDB =async (payload: { day: string; meal: IMeal }) => {
    const { day, meal } = payload;

    try {
      const existingDayMeal = await DayMealModel.findOne({ day });

      if (existingDayMeal) {
        existingDayMeal.meals.push(meal);
        await existingDayMeal.save();
        return existingDayMeal;
      } else {
        const newDayMeal = await DayMealModel.create({
          day,
          meals: [meal],
        });
        return newDayMeal;
      }
    } catch (error) {
      console.error("Error adding meal to day:", error);
      throw error;
    }
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

  try {
    const document = await DayMealModel.findOne({ "meals._id": _id });

    if (!document) {
      console.log("No document found with meal ID:", _id);
      return null;
    }

    const mealIndex = document.meals.findIndex(
      (meal) => meal._id && meal._id.toString() === _id
    );

    if (mealIndex === -1) {
      console.log("Meal not found in the document:", _id);
      return null;
    }

    Object.keys(payload).forEach((key) => {
      (document.meals[mealIndex] as any)[key] = payload[key as keyof IMeal];
    });

    await document.save();

    const result = await DayMealModel.findOne({ "meals._id": _id });
    // console.log(result, "result");
    return result;
  } catch (error) {
    console.error("Error updating meal:", error);
    throw error;
  }
};

const deleteMealById = async (_id: string) => {
  try {
    const document = await DayMealModel.findOne({ "meals._id": _id });

    if (!document) {
      console.log("No document found with meal ID:", _id);
      return null;
    }

    const result = await DayMealModel.findOneAndUpdate(
      { "meals._id": _id },
      { $pull: { meals: { _id: _id } } },
      { new: true } 
    );

    return result;
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};

export const mealService = {
    createMealIntoDB,
    getAllMeals,
    getMealById,
    updateMealById,
    deleteMealById,
 
}