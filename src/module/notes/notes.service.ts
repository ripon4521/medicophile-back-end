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

const getSingleNotes = async (_id: string) => {
  const result = await NotesModel.findOne({ _id })
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
  return result;
};

const updateNote = async (_id: string, payload: Partial<INotes>) => {
  const update = await NotesModel.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });
  return update;
};

const deleteNote = async (_id: string) => {
  const result = await NotesModel.findOneAndDelete({ _id });
  return result;
};

export const noteService = {
  createNote,
  updateNote,
  getAllNotes,
  getSingleNotes,
  deleteNote,
};
