import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ILeecture } from "./lecture.interface";
import LectureModel from "./lecture.model";
import courseModel from "../course/course.model";
import { UserModel } from "../user/user.model";
import ModuleModel from "../modules/modules.model";

const createLecture = async (payload: ILeecture) => {
  const course = await courseModel.findOne({_id:payload.courseId, isDeleted:false});
  const useer = await UserModel.findOne({_id:payload.createdBy, isDeleted:false});
  const modul = await ModuleModel.findOne({_id:payload.moduleId});
  if (!course) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Inavlid course id",
    );
  }else if (!useer || useer.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Inavlid user id")
  }else if (!modul) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Inavlid module id")
  }
  const create = await LectureModel.create(payload);
  if (!create) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Faled to create, PLease try again",
    );
  }
  return create;
};

const updateLecture = async (slug: string, payload: Partial<ILeecture>) => {
  try {
    const update = await LectureModel.findOneAndUpdate({ slug }, payload, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Lecture not found or update failed.",
      );
    }

    return update;
  } catch (error) {
    console.error("Update Lecture Error:", error);
    throw error;
  }
};

const deleteLecture = async (slug: string) => {
  const deleted = await LectureModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
  );
  if (!deleted) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete, please relaod or go back and try again",
    );
  }
  return deleted;
};

const getAllLecture = async () => {
  const result = await LectureModel.find({ isDeleted: false })
    .populate({
      path: "createdBy",
      select: "name role phone",
    })
    .populate({
      path: "courseId",
      select:
        "cover_photo course_title description duration course_type category daySchedule expireTime price offerPrice status slug",
      populate: { path: "category", select: "title cover_photo" },
    })
    .populate({
      path: "moduleId",
      select: "moduleTitle slug",
    });

  return result;
};

const getSingleLecture = async (slug: string) => {
  console.log(slug)
  const result = await LectureModel.findOne({ slug })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    })
    .populate("moduleId");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Slug is not valid, Please reload or go back and try again ",
    );
  }
  return result;
};


const getSpcificLecture = async (id: string) => {
  const result = await LectureModel.find({moduleId:id, isDeleted:false })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    })
    .populate("moduleId");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "module id is not valid or not found in database",
    );
  }
  return result;
};



export const lectureServices = {
  createLecture,
  updateLecture,
  deleteLecture,
  getAllLecture,
  getSingleLecture,
  getSpcificLecture
};
