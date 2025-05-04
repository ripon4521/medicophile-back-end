import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import {
  referDetailsService,
  singleReferDetails,
} from "./referDetails.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const getAllReferDetails = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await referDetailsService.getAllReferDetails(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Refer Details get successfully",
    data: result,
  });
});

const deleteReferDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const result = await referDetailsService.deleteReferDetails(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "refer details deleted successfully",
    data: result,
  });
});

const getSingleReferDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
    }
    const result = await singleReferDetails(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "refer details get successfully",
      data: result,
    });
  },
);

export const referDetailsController = {
  getAllReferDetails,
  deleteReferDetails,
  getSingleReferDetails,
};
