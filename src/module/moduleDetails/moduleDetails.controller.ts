import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { moduleDetailsService } from "./moduleDetails.service";
import AppError from "../../helpers/AppError";

const createModuleDetails = catchAsync(async (req, res) => {
  const result = await moduleDetailsService.createModuleDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Module Details Created successfully",
    data: result,
  });
});

const updateModuleDetails = catchAsync(async (req, res) => {
  const { _id } = req.body;
  const payload = req.body;
  delete payload._id;
  // console.log(object)
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ");
  }

  const result = await moduleDetailsService.updateModuleDetails(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details updated successfully",
    data: result,
  });
});

const deleteModuleDetails = catchAsync(async (req, res) => {
  const { _id } = req.body;
  const result = await moduleDetailsService.deleteModuleDetails(_id);
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
  const query = req.query;
  const result = await moduleDetailsService.getAllModuleDetails(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module Details get successfully",
    data: result,
  });
});

const getSpeecificModuleDtails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await moduleDetailsService.getSpcificModuDtails(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc Moduule Dtails  fatched successfully",
    data: result,
  });
});

export const moduleDetailsController = {
  createModuleDetails,
  deleteModuleDetails,
  updateModuleDetails,
  getAllModuleDetails,
  getSingleModuleDetails,
  getSpeecificModuleDtails,
};
