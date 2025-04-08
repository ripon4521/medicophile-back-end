import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { INotes } from "./notes.interface";
import NotesModel from "./notes.model";

const createNote = async (paload: INotes) => {
  const result = await NotesModel.create(paload);
  return result;
};

const getAllNotes = async () => {
  const result = await NotesModel.find()
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
   
  return result;
};

const getSingleNotes = async (slug: string) => {
  const result = await NotesModel.findOne({ slug })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    })
    .populate("moduleId");
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to get Notes. Slug is not valid, reload or go back and try again",
      );
    }
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
    { new: true }
  );

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "PLease Try Again ");
  }
  return result;
};

export const noteService = {
  createNote,
  updateNote,
  getAllNotes,
  getSingleNotes,
  deleteNote,
};
