import { ICourse } from "./course.interface";
import { nanoid } from "nanoid";
import QueryBuilder from "../../builder/querybuilder";
import { searchableFields } from "./coursee.constant";
import slugify from "slugify";
import courseModel from "./course.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { addMonths, isAfter } from "date-fns";
import { PurchaseModel } from "../purchase/purchase.model";

const createCourseIntoDb = async (payload: ICourse): Promise<ICourse> => {
  const id = payload.createdBy;
  const user = await UserModel.findOne({ _id: id });
  if (!user || user?.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User not found. Please provide valid user id. ony admin and teacher is valid",
    );
  }
  const result = await courseModel.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const finalQuery = {
    ...query,
    status: "active",
  };

  const courseQuery = new QueryBuilder(courseModel, finalQuery)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "category",
      select: "title cover_photo slug",
    })
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  const currentDateBD = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
  );

  // Filter out expired courses
  const ongoingCourses = result.filter((course: any) => {
    if (!course.createdAt || !course.duration) return false;

    const durationMatch = course.duration.match(/(\d+)\s*months?/i);
    if (!durationMatch) return false;

    const months = parseInt(durationMatch[1]);
    const endDate = addMonths(new Date(course.createdAt), months);

    return isAfter(endDate, currentDateBD);
  });

  return ongoingCourses;
};

const getCourseById = async (slug: string) => {
  const result = await courseModel
    .findOne({ slug })
    .populate({
      path: "category",
      select: "title cover_photo slug",
    })
    .populate({
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


const getUserPurchasedCourses = async (userId:string) => {
  const purchases = await PurchaseModel.find({
    userId,
    paymentStatus: 'Paid',
    status: 'Active'
  }).populate('courseId'); 

  // শুধু কোর্স ডেটা রিটার্ন করবো
  return purchases.map(purchase => purchase.courseId);
};
export const courseService = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getCourseById,
  updateCourseInDb,
  deleteCourseFromDb,
  getUserPurchasedCourses
};
