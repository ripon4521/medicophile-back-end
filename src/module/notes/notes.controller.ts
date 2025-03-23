import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { noteService } from "./notes.service";

const createNote = catchAsync(async (req, res) => {
  const result = await noteService.createNote(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Note Created successfully",
    data: result,
  });
});

const updateNote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await noteService.updateNote(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Note updated successfully",
    data: result,
  });
});

const deleteNote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await noteService.deleteNote(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Note deleted successfully",
    data: result,
  });
});

const getSingleNote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await noteService.getSingleNotes(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Note get successfully",
    data: result,
  });
});

const getAllNotes = catchAsync(async (req, res) => {
  const result = await noteService.getAllNotes();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Notes get successfully",
    data: result,
  });
});

export const notesController = {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
};
