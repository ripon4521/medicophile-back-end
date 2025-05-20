import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentsService } from "./student.service";
import AppError from "../../helpers/AppError";

const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query;
  const students = await studentsService.getAllStudents(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Students Get successfully",
    data: students,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const student = await studentsService.getStudentById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Student Get successfully",
    data: student,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await studentsService.deleteStudentById(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Student Deleted successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const data = req.body;
  delete data._id;
  const result = await studentsService.updateStudent(_id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Student & Nested User Updated successfully",
    data: result,
  });
});

export const studentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
