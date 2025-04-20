import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IExam } from "./exam.interface";
import ExamModel from "./exam.model";
import ModuleModel from "../modules/modules.model";
import { UserModel } from "../user/user.model";
import courseModel from "../course/course.model";

const createExam = async (payload: IExam) => {
  const moduleId = payload.moduleId;
  const createdBy = payload.createdBy;
  const courseId = payload.courseId;
  const module = await ModuleModel.findOne({ _id: moduleId });
  const user = await UserModel.findOne({ _id: createdBy });
  const course = await courseModel.findOne({ _id: courseId });
  if (!module) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Module is not avileable. Please provide a valid module id",
    );
  } else if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User is not avileable. Please provide a valid user id.only admin and teacer create exam",
    );
  } else if (!course) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Course is not avileable. Please provide a valid Course id",
    );
  }
  const result = await ExamModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed To Create Exam, Please cheack and try again",
    );
  }
  return result;
};

const getAllExam = async () => {
  const result = await ExamModel.find({ isDeleted: false })
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

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to load data, please try again",
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
      "Failed to load data , please try again",
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
        "Exam not found or update failed.",
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
    { new: true },
  );
  return result;
};

const getSpcificExam = async (id: string) => {
  const result = await ExamModel.find({moduleId:id, isDeleted:false})
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

export const examServices = {
  createExam,
  updateExam,
  deleteExam,
  getAllExam,
  getSingleExam,
  getSpcificExam
};
