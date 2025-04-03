import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { moduleDetailsService } from "./moduleDetails.service";

const createModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.createModuleDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Module Details Created successfully",
    data: result,
  });
});

const updateModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.updateModuleDetails(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details updated successfully",
    data: result,
  });
});

const deleteModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.deleteModuleDetails(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details deleted successfully",
    data: result,
  });
});

const getSingleModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.getSingleModuleDetails(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details  get successfully",
    data: result,
  });
});

const getAllModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.getAllModuleDetails();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details get successfully",
    data: result,
  });
});

export const moduleDetailsController = {
  createModuleDetails,
  deleteModuleDetails,
  updateModuleDetails,
  getAllModuleDetails,
  getSingleModuleDetails,
};
