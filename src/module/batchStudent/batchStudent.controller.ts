import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { batchStudentService } from "./batchStudent.service";
import AppError from "../../helpers/AppError";


const createBatchStudent = catchAsync(async (req, res) => {
  const result = await batchStudentService.createBatchStudent(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Batch Student  Created successfully",
    data: result,
  });
});


const getAllBatchStudent = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await batchStudentService.getAllBatchStudents(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Batch Student  fathced successfully",
      data: result,
    });
  });


const getSingleBatchStduent = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.NOT_FOUND, "Please provide a valid id");
  }
  const result = await batchStudentService.getSingleBatchStudent(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Batch Student  fathced successfully",
    data: result,
  });
});


const updateBacthStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError(StatusCodes.NOT_FOUND, "Please provide a valid id");
    }
    const payload = req.body;
    const result = await batchStudentService.updateBatchStudent(id, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Batch Studnet  updated successfully",
      data: result,
    });
  });
  

  const deleteBatchStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError(StatusCodes.NOT_FOUND, "Please provide a valid id");
    }
    const result = await batchStudentService.deleteBatchStduent(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Batch Student  Deleted successfully",
      data: result,
    });
  });

export const batchStuentController = { 
    createBatchStudent,
    deleteBatchStudent,
    updateBacthStudent,
    getAllBatchStudent,
    getSingleBatchStduent
}