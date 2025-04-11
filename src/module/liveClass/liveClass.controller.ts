import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { liveClassService } from "./liveClass.service";
import AppError from "../../helpers/AppError";



const createLiveClass = catchAsync(async (req, res) => {
    const result = await liveClassService.createLiveClass(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Live Class Created successfully",
      data: result,
    });
  });

  
const getAllLiveClass = catchAsync(async (req, res) => {
    const result = await liveClassService.getAllLiveClass();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Live Class fatched successfully",
      data: result,
    });
  });


  const getSingleLiveClass = catchAsync(async (req, res) => {
    const {slug} = req.params;
    if (!slug) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Please provide valid slug",
        );
      }
    const result = await liveClassService.singleGetLiveClass(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Single Live Class fatched successfully",
      data: result,
    });
  });


  
  const deleteLiveClass = catchAsync(async (req, res) => {
    const {slug} = req.params;
    if (!slug) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Please provide valid slug",
        );
      }
    const result = await liveClassService.deleteLiveClass(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Live Class deleted successfully",
      data: result,
    });
  });



    
  const updateLiveClass = catchAsync(async (req, res) => {
    const {slug} = req.params;
    const payload = req.body;
    if (!slug) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Please provide valid slug",
        );
      }
    const result = await liveClassService.updateLiveClass(slug, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Live Class updated successfully",
      data: result,
    });
  });


  export const liveClassController = {
    createLiveClass,
    deleteLiveClass,
    updateLiveClass,
    getAllLiveClass,
    getSingleLiveClass
  }