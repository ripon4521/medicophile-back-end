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


export const getStudentStats = async (req:Request, res:Response) => {
  try {
    const { day, month, year } = req.query;

    let matchCondition: any = {
      isDeleted: false,
    };

    if (day && month && year) {
      const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
      matchCondition.createdAt = { $gte: startDate, $lte: endDate };
    } else if (month && year) {
      const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));
      matchCondition.createdAt = { $gte: startDate, $lt: endDate };
    } else if (year) {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
      matchCondition.createdAt = { $gte: startDate, $lt: endDate };
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
