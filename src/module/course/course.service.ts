import slugify from "slugify";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";
import { nanoid } from "nanoid";
import QueryBuilder from "../../builder/querybuilder";
import { searchableFields } from "./coursee.constant";


const createCourseIntoDb = async (payload: ICourse): Promise<ICourse> => {
    const titleSlug = slugify(payload.course_title, {
        lower: true, 
        strict: true, 
        trim: true
    }).replace(/-/g, ""); 
    const uniqueId = nanoid(4).toUpperCase();
    const uniqueCourseCode = `${titleSlug.substring(0, 6).toUpperCase()}-${uniqueId}`;
    payload.course_code = uniqueCourseCode;
    const result = await CourseModel.create(payload);
    return result;
};

const getAllCoursesFromDb = async(query: Record<string, unknown>) => {
    console.log(query)
    const courseQuery = new QueryBuilder(
        CourseModel.find(),
        query
      )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
      const result = await courseQuery.modelQuery;
      return result;
}

const getCourseById = async (_id: string) => {
    const result = await CourseModel.findOne({_id});
    return result;
}

const updateCourseInDb = async(_id: string, payload: Partial<ICourse>) => {
    const result = await CourseModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteCourseFromDb = async (_id: string) => {
    const result = await CourseModel.findOneAndDelete({_id});
    return result;
}


export const courseService = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getCourseById,
    updateCourseInDb,
    deleteCourseFromDb,
 
}