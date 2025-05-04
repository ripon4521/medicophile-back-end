import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { referDetailsService } from "./referDetails.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllReferDetails = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await referDetailsService.getAllReferDetails(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Refer Details get successfully",
      data: result,
    });
  });

  export const referDetailsController = {
    getAllReferDetails
  }