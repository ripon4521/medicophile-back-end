import { ICourse } from "./course.interface";
import { nanoid } from "nanoid";
import QueryBuilder from "../../builder/querybuilder";
import { searchableFields } from "./coursee.constant";
import slugify from "slugify";
import courseModel from "./course.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const createCourseIntoDb = async (payload: ICourse): Promise<ICourse> => {
  const result = await courseModel.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(courseModel, query) 
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path:'category',
      populate: { path: 'createdBy'}
    })
    .populate(['createdBy'])
    

   

  const result = await courseQuery.exec(); 
  return result;
};


const getCourseById = async (slug: string) => {
  const result = await courseModel.findOne({ slug }).populate("category");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Course Ctaegory. Slug is not valid, reload or go back and try again",
    );
  }
  return result;
};

const updateCourseInDb = async (slug: string, payload: Partial<ICourse>) => {
  const update = await courseModel.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Course Ctaegory. Slug is not valid, reload or go back and try again",
    );
  }

  return update;
};

const deleteCourseFromDb = async (slug: string) => {
  const result = await courseModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "PLease Try Again ");
  }
  return result;
};

export const courseService = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getCourseById,
  updateCourseInDb,
  deleteCourseFromDb,
};
