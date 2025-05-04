import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { referRewardService } from "./referalReward.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



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


export const referRewardController = {
    createReferReward,
    getAllReferDetails
}
    
