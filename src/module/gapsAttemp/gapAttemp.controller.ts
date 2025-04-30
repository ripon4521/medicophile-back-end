import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { gapAttempService } from "./gapAttemp.service";
import AppError from "../../helpers/AppError";

const getAllGapAttemp = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await gapAttempService.getAllGapAttemp(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Attemp fatched successfully",
    data: result,
  });
});

const getSpecificUserAttemp = catchAsync(async (req, res) => {
  const { studentId } = req.body;
  const { examId } = req.body;
  if (!studentId || !examId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Please provide studentId and Exam Id",
    );
  }
  const result = await gapAttempService.getSpecificUserGapsAttempMark(
    studentId,
    examId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Attemp fatched successfully",
    data: result,
  });
});

export const getAttempController = {
  getAllGapAttemp,
  getSpecificUserAttemp,
};
