import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultysService } from "./faculty.service";
import AppError from "../../helpers/AppError";

const getAllFaculty = catchAsync(async (req, res) => {
  const students = await facultysService.getAllFacultys();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Faculty Get successfully",
    data: students,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await facultysService.getFacultyById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Student Get successfully",
    data: student,
  });
});

const updatedFaculty = catchAsync(async (req, res) => {
  const { _id }  = req.body;
  const payload = req.body;
  delete payload._id;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Please provide id ')
  }

 
  const updatedStudent = await facultysService.updateFaculty(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Faculty Updated successfully",
    data: updatedStudent,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Please provide id ')
  }
  const result = await facultysService.deleteFacultyById(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Faculty Deleted successfully",
    data: result,
  });
});

export const facultysController = {
  getAllFaculty,
  getSingleFaculty,
  updatedFaculty,
  deleteFaculty,
};
