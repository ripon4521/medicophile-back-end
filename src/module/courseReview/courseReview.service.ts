import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import courseModel from "../course/course.model";
import { ICourseReview } from "./courseReview.interface";
import CourseReviewModel from "./courseReview.model";
import { UserModel } from "../user/user.model";
import QueryBuilder from "../../builder/querybuilder";


const createCourseReview = async (payload: ICourseReview) => {
    const course = await courseModel.findOne({ _id: payload.courseId, isDeleted:false });
    const user = await UserModel.findOne({_id: payload.studentId});

    
    if (!course) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Not Found Course",
      );
    }else if (!user) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "Invalid student id",
          );
    }
    
  
    const result = await CourseReviewModel.create(payload);
    return result;
  };
  

  const getAllCourseReveiw = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(CourseReviewModel, query)
      .search(["review"])
      .filter()
      .sort()
      .paginate()
      .fields()
      .populate([
        {
          path: "courseId",
        },
      ]).populate([
          {
            path: "studentId",
            select:"name role phone profile_picture"
          },
        ]);
  
    const result = await courseQuery.exec();
    return result;
  };
  

  const updateCourseReview = async (
    _id: string,
    payload: Partial<ICourseReview>,
  ) => {
    // Update operation
    const update = await CourseReviewModel.findOneAndUpdate({ _id }, payload, {
      new: true,
      runValidators: true,
    });
  
    if (!update) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to update Course Reveiw. ",
      );
    }
  
    return update;
  };

  const deleteCourseReveiw = async (_id: string) => {
    const result = await CourseReviewModel.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), 
      },
      { new: true },
    );
  
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, "PLease Try Again ");
    }
    return result;
  };

  const getSingleCourseReveiw = async ( courseId: string ) => {
    const result = await CourseReviewModel.find({courseId}).populate("courseId").populate("studentId")
  return result;

  };

  export const courseReveiwService = {
    createCourseReview,
    updateCourseReview,
    deleteCourseReveiw,
    getAllCourseReveiw,
    getSingleCourseReveiw
  }