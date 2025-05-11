import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { INotes } from "./notes.interface";
import NotesModel from "./notes.model";
import { UserModel } from "../user/user.model";
import courseModel from "../course/course.model";
import LectureModel from "../lecture/lecture.model";
import ModuleModel from "../modules/modules.model";

const createNote = async (paload: INotes) => {
  const course = await courseModel.findOne({
    _id: paload.courseId,
    isDeleted: false,
  });
  const useer = await UserModel.findOne({
    _id: paload.createdBy,
    isDeleted: false,
  });
  const modul = await ModuleModel.findOne({ _id: paload.moduleId });
  if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Inavlid course id");
  } else if (!useer || useer.role === "student") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Inavlid user id.Only admin or teacher can create note");
  } else if (!modul) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Inavlid module id");
  }
  const result = await NotesModel.create(paload);
  return result;
};

const getAllNotes = async () => {
  const result = await NotesModel.find({ isDeleted: false })
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

const getSingleNotes = async (slug: string) => {
  const result = await NotesModel.findOne({ slug })
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

const updateNote = async (slug: string, payload: Partial<INotes>) => {
  const update = await NotesModel.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Notes. Slug is not valid, reload or go back and try again",
    );
  }
  return update;
};

const deleteNote = async (slug: string) => {
  const result = await NotesModel.findOneAndUpdate(
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

const getSpcificNotes = async (id: string) => {
  const result = await NotesModel.find({ moduleId: id, isDeleted: false })
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

export const noteService = {
  createNote,
  updateNote,
  getAllNotes,
  getSingleNotes,
  deleteNote,
  getSpcificNotes,
};
