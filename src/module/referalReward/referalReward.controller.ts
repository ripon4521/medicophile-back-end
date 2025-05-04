import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { referRewardService, singleReferReward } from "./referalReward.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const getAllReferDetails = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await referRewardService.getAllReferReward(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Refer Reward get successfully",
    data: result,
  });
});

const createReferReward = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await referRewardService.createReferralReward(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Refer Reward Cretaed Successfully",
    data: result,
  });
});
const getSingleReferReward = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const result = await singleReferReward(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "refer reward get successfully",
    data: result,
  });
});

const deleteReferReward = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const result = await referRewardService.deleteReferReward(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "refer reward deleted successfully",
    data: result,
  });
});

const updateReferReward = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await referRewardService.updateReferReward(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Refer Reward updated successfully",
    data: result,
  });
});

export const referRewardController = {
  createReferReward,
  getAllReferDetails,
  getSingleReferReward,
  deleteReferReward,
  updateReferReward,
};
