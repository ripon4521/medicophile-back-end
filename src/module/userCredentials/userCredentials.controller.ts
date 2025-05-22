import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userCredentialsService } from "./userCreadentials.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllCredentials = catchAsync(async (req: Request, res: Response) => {
  const result = await userCredentialsService.getAllCredentials();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User Credentials Get successfully",
    data: result,
  });
});

const getSingleCredentials = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userCredentialsService.getSingleCrtedentials(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single User Credentials Get successfully",
    data: result,
  });
});

const deleteCredintials = catchAsync(async (req: Request, res: Response) => {
  const result = await userCredentialsService.deleteMany();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " User Credentials delete successfully",
    data: result,
  });
});

export const userCredentialsController = {
  getAllCredentials,
  getSingleCredentials,
  deleteCredintials
};
