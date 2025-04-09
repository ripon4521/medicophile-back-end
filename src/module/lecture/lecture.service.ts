import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ILeecture } from "./lecture.interface";
import LectureModel from "./lecture.model";

const createLecture = async (payload: ILeecture) => {
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
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    })
    .populate("moduleId");

  return result;
};

const getSingleLecture = async (slug: string) => {
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

export const lectureServices = {
  createLecture,
  updateLecture,
  deleteLecture,
  getAllLecture,
  getSingleLecture,
};
