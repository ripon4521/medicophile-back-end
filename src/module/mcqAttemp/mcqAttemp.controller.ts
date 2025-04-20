import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status"; 
import { mcqAttempService } from './mcqAttemp.service';
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";


 const submitMcqAttemptController = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId, answer } = req.body;
    if (!studentId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id")
    }

    const result = await mcqAttempService.submitAttemptService({ studentId, answer });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "MCQ deleted successfully",
        data: result,
      });
  }
);


export const mcqAttempController ={
    submitMcqAttemptController
}