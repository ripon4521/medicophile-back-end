import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offlineBatchService } from "./offlineBatch.service";


const createOfflineBatch = catchAsync(async (req, res) => {
    const result = await offlineBatchService.createOfflineBatch(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Offline Batch Created successfully",
      data: result,
    });
  });


const updateOfflineBatch = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const payload = req.body;
    const result = await offlineBatchService.updateOfflineBatch(slug, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Offline Batch updated successfully",
      data: result,
    });
  });


const deleteOfflineBatch = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await offlineBatchService.deleteOffLineBatch(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Offline Batch deleted successfully",
      data: result,
    });
  });
  

const getSingleOfflineBatch = catchAsync(async (req, res) => {
    const { slug } = req.params;
    const result = await offlineBatchService.getSingleOfflineBatch(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Single Offline Batch get successfully",
      data: result,
    });
  });


  const getAllOfflineBatch = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await offlineBatchService.getAllOfflineBatch(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Offline Batch get successfully",
      data: result,
    });
  });


export const offlineBatchController = {
    createOfflineBatch,
    deleteOfflineBatch,
    updateOfflineBatch,
    getAllOfflineBatch,
    getSingleOfflineBatch
}