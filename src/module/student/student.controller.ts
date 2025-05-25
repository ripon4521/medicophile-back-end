import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { studentsService } from "./student.service";
import AppError from "../../helpers/AppError";
import studentModel from "./student.model";
import { Request, Response } from "express";

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


export const getStudentStats = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, day, month, year } = req.query;

    let matchCondition: any = {
      isDeleted: false,
    };

    const dayNum = day ? Number(day) : null;
    const monthNum = month ? Number(month) : null;
    const yearNum = year ? Number(year) : null;

    if (startDate && endDate) {
      // Custom date range filter
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (dayNum && monthNum && yearNum) {
      // Specific day filter
      const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
      const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (monthNum && yearNum) {
      // Month + Year filter
      const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
      // last day of month
      const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (yearNum) {
      // Year filter
      const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
      const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
      end.setHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };
    }

    const students = await studentModel.find(matchCondition);

    res.status(200).json({
      success: true,
      total: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};






export const studentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
  getStudentStats
};
