
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";
import { nanoid } from "nanoid";
import QueryBuilder from "../../builder/querybuilder";
import { searchableFields } from "./coursee.constant";
import slugify from 'slugify';


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





// const getAllCategorieFromDb = async (query: Record<string, unknown>) => {
//     const queryBuilder = new QueryBuilder(CategoriedModel.find(), query);
  
//     const result = await queryBuilder
//       .search(['name', 'description']) 
//       .filter()
//       .sort()
//       .select()
//       .modelQuery.exec(); // Execute the query
  
//     return result;
//   };


const getAllCoursesFromDb =async () => {
    const result = await CourseModel.find().populate('category');
    return result;
}

// const getAllCoursesFromDb = async(query: Record<string, unknown>) => {
//     console.log(query)
//     const courseQuery = new QueryBuilder(
//         CourseModel.find(),
//         query
//       )
//         .search(searchableFields)
//         .filter()
//         .sort()
  
   
    
       
    
//       const result = await courseQuery.modelQuery;
//       console.log(result)
//       return result;
// }

const getCourseById = async (_id: string) => {
    const result = await CourseModel.findOne({_id}).populate('category');
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