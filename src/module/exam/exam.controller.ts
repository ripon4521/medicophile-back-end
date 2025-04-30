import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { examServices } from "./exam.service";

const createExam = catchAsync(async (req, res) => {
  const result = await examServices.createExam(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Exam Created successfully",
    data: result,
  });
});

const getExam = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await examServices.getAllExam(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Exam fatched successfully",
    data: result,
  });
});

const getSingleExam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await examServices.getSingleExam(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Exam fatched successfully",
    data: result,
  });
});

const deleteExam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await examServices.deleteExam(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "  Exam Delete successfully",
    data: result,
  });
});

const updateExam = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await examServices.updateExam(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Exam Update successfully",
    data: result,
  });
});


const getSpeecificExam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await examServices.getSpcificExam(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc Exam  fatched successfully",
    data: result,
  });
});


const getStudentsByExamService = catchAsync(async (req, res) => {
  const { examId } = req.params;
  const result = await examServices.getStudentsByExamService(examId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc Exam  fatched successfully",
    data: result,
  });
});



export const examController = {
  createExam,
  getExam,
  getSingleExam,
  updateExam,
  deleteExam,
  getSpeecificExam,
  getStudentsByExamService
};
