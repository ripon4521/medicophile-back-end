import slugify from "slugify";
import { ICourseCategory } from "./courseCaregory.interface";
import CourseCategory from "./courseCategory.model";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const createCourseCategory = async (payload: ICourseCategory) => {
  const result = await CourseCategory.create(payload);
  return result;
};

const getAllCourseCategory = async () => {
  const result = await CourseCategory.find({isDeleted:false});
  return result;
};

const getSingleCourseCatgeory = async (slug: string) => {
  const result = await CourseCategory.findOne({ slug });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Course Ctaegory. Slug is not valid, reload or go back and try again"
    );
  }
  return result;
};

const updateCourseCategory = async (
  slug: string,
  payload: Partial<ICourseCategory>
) => {
  // Update operation
  const update = await CourseCategory.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Course Ctaegory. Slug is not valid, reload or go back and try again"
    );
  }

  return update;
};

const deleteCourseCategory = async (slug: string) => {
  const result = await CourseCategory.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true }
  );
  return result;
};

export const courseCategoryService = {
  createCourseCategory,
  getAllCourseCategory,
  updateCourseCategory,
  getSingleCourseCatgeory,
  deleteCourseCategory,
};
