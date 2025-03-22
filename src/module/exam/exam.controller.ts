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
    const result = await examServices.getAllExam();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Exam fatched successfully",
      data: result,
    });
  });


  const getSingleExam = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await examServices.getSingleExam(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Single Exam fatched successfully",
      data: result,
    });
  });
  

  const deleteExam = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await examServices.deleteExam(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "  Exam Delete successfully",
      data: result,
    });
  });

  
  const updateExam = catchAsync(async (req, res) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await examServices.updateExam(id, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Exam Update successfully",
      data: result,
    });
  });

  export const examController ={
    createExam,
    getExam,
    getSingleExam,
    updateExam,
    deleteExam

  }

  