import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import courseModel from "../course/course.model";
import { ICourseDetails } from "./courseDetails.interface";
import CourseDetailsModel from "./courseDetails.model";
import QueryBuilder from "../../builder/querybuilder";


const createCourseDetails = async (payload: ICourseDetails) => {
  const course = await courseModel.findOne({ _id: payload.courseId, isDeleted:false });
  const exist = await CourseDetailsModel.findOne({courseId:payload.courseId})
  if (!course) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Not Found Course",
    );
  }
  if (exist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Already exists in database",
    );
  }

  const result = await CourseDetailsModel.create(payload);
  return result;
};



const getAllCourseDetails = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseDetailsModel, query)
    .search(["syllabus"])
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
          path: "instructors",
          select:"name role phone profile_picture"
        },
      ]);

  const result = await courseQuery.exec();
  return result;
};


const updateCourseDetails = async (
  _id: string,
  payload: Partial<ICourseDetails>,
) => {
  // Update operation
  const update = await CourseDetailsModel.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Course Details. ",
    );
  }

  return update;
};


const getSingleCourseDetails = async ( courseId: string ) => {
    const result = await CourseDetailsModel.findOne({courseId}).populate("courseId").populate("instructors")
  return result;

  };


  const deleteCourseDetails = async ( _id: string ) => {
    const result = await CourseDetailsModel.findOneAndDelete({_id});
  return result;

  };

  export const courseDetailsService = {
    createCourseDetails,
    updateCourseDetails,
    deleteCourseDetails,
    getAllCourseDetails,
    getSingleCourseDetails
  }