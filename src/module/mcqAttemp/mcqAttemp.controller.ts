import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { mcqAttempService } from "./mcqAttemp.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const submitMcqAttemptController = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId, answer } = req.body;
    if (!studentId) {
      throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id");
    }

    const result = await mcqAttempService.submitAttemptService({
      studentId,
      answer,
    });

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "MCQ Atttmp created successfully",
      data: result,
    });
  },
);

const getSpeecificMccq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await mcqAttempService.getSpcificMcqAttemp(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc MCQ Attmp  fatched successfully",
    data: result,
  });
});

const getAllMcq = catchAsync(async (req, res) => {
  // const query = req.query;
  const result = await mcqAttempService.getAllMcq();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " MCQ Attmp  fatched successfully",
    data: result,
  });
});

export const mcqAttempController = {
  submitMcqAttemptController,
  getSpeecificMccq,
  getAllMcq,
};
