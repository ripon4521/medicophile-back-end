import { ICourseCategory } from "./courseCaregory.interface";
import CourseCategory from "./courseCategory.model";


const createCourseCategory = async (payload:ICourseCategory) => {
    const result = await CourseCategory.create(payload);
    return result;
}

const getAllCourseCategory = async () => {
    const result = await CourseCategory.find({ isDeleted: false });
    return result;
}




export const courseCategoryService = {
    createCourseCategory,
    getAllCourseCategory
}