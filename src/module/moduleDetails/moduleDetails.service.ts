import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IModuleDetails } from "./moduleDetails.interface";
import ModuleDetails from "./moduleDetails.model";
import QueryBuilder from "../../builder/querybuilder";
import ModuleModel from "../modules/modules.model";
import courseModel from "../course/course.model";
import ExamModel from "../exam/exam.model";
import LectureModel from "../lecture/lecture.model";
import NotesModel from "../notes/notes.model";

const createModuleDetails = async (payload: IModuleDetails) => {
  const module = await ModuleModel.findOne({ _id: payload.moduleId });
  const course = await courseModel.findOne({ _id: payload.courseId });
  if (
    payload.content_type === "Exam" ||
    payload.content_type === "Lecture" ||
    payload.content_type === "Notes"
  ) {
    const exam = await ExamModel.findOne({ _id: payload.contentId });
    const lecture = await LectureModel.findOne({ _id: payload.contentId });
    const notes = await NotesModel.findOne({ _id: payload.contentId });

    if (payload.content_type === "Exam" && !exam) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid content id or exam id",
      );
    } else if (payload.content_type === "Lecture" && !lecture) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid conetnt or lecture id",
      );
    } else if (payload.content_type === "Notes" && !notes) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid conetnt or notes id",
      );
    }
  }

  if (!module) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid module id");
  }
  if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid course id");
  }
  const result = await ModuleDetails.create(payload);

  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create module details, please try again",
    );
  }
  return result;
};

const getAllModuleDetails = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ModuleDetails, query)
    .filter()
    .paginate()
    .fields()
    .populate([
      {
        path: "courseId",
        select:
          "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
        populate: { path: "category", select: "title cover_photo" },
      },
    ])
    .populate([
      {
        path: "moduleId",
        select: "moduleTitle",
      },
    ])
    .populate([
      {
        path: "contentId",
        select: "title  ",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const getSingleModuleDetails = async (_id: string) => {
  const result = await ModuleDetails.findOne({ _id })
    .populate("courseId")
    .populate("moduleId")
    .populate("contentId");
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to load data , please reload and try again",
    );
  }
  return result;
};

const deleteModuleDetails = async (_id: string) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "id not found ");
  }
  const result = await ModuleDetails.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete data, please provide a valid id",
    );
  }
};

const updateModuleDetails = async (_id: string, payload: IModuleDetails) => {
  try {
    const update = await ModuleDetails.findByIdAndUpdate(_id, payload, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      throw new Error("No data found with the provided ID");
    }

    return update;
  } catch (error) {
    console.error(error);
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while updating",
    );
  }
};

export const moduleDetailsService = {
  createModuleDetails,
  getAllModuleDetails,
  getSingleModuleDetails,
  updateModuleDetails,
  deleteModuleDetails,
};
