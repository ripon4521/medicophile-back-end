import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IExam } from "./exam.interface";
import ExamModel from "./exam.model";

const createExam = async (payload: IExam) => {
  const result = await ExamModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed To Create Exam, Please cheack and try again"
    );
  }
  return result;
};

const getAllExam = async () => {
  const result = await ExamModel.find()
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to load data, please try again"
    );
  }

  return result;
};

const getSingleExam = async (slug: string) => {
  const result = await ExamModel.findOne({ slug })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
  console.log(result);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to load data , please try again"
    );
  }
  return result;
};

const updateExam = async (slug: string, payload: Partial<IExam>) => {
  try {
    const update = await ExamModel.findOneAndUpdate({ slug }, payload, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Exam not found or update failed."
      );
    }

    return update;
  } catch (error) {
    console.error("Update Exam Error:", error);
    throw error;
  }
};

const deleteExam = async (slug: string) => {
  const result = await ExamModel.findOneAndUpdate(
    { slug },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true }
  );
  return result;
};

export const examServices = {
  createExam,
  updateExam,
  deleteExam,
  getAllExam,
  getSingleExam,
};
