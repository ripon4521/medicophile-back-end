import slugify from "slugify";
import { ICourseCategory } from "./courseCaregory.interface";
import CourseCategory from "./courseCategory.model";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";

const createCourseCategory = async (payload: ICourseCategory) => {
  const user = await UserModel.findOne({ _id: payload.createdBy });
  if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Invalid user id, only admin and teacher id is valid",
    );
  }
  const isExist = await CourseCategory.findOne({ title: payload.title });
  if (isExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Course Category Already Exist in Database",
    );
  }

  const result = await CourseCategory.create(payload);
  return result;
};

const getAllCourseCategory = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseCategory, query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const getSingleCourseCatgeory = async (slug: string) => {
  const result = await CourseCategory.findOne({
    slug,
    isDeleted: false,
  }).populate({
    path: "createdBy",
    select: "name role phone",
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Course Ctaegory. Slug is not valid, reload or go back and try again",
    );
  }
  return result;
};

const updateCourseCategory = async (
  slug: string,
  payload: Partial<ICourseCategory>,
) => {
  // Update operation
  const update = await CourseCategory.findOneAndUpdate({ slug }, payload, {
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

const deleteCourseCategory = async (slug: string) => {
  const result = await CourseCategory.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
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
