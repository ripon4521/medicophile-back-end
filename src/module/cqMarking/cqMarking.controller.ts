import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { cqMarkingService } from "./cqMarking.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const createCqMarking = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await cqMarkingService.createCqMarking(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "CQ Marking Created successfully",
    data: result,
  });
});

const getAllCqMarking = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await cqMarkingService.getAllCqMarking(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Marking fatched successfully",
    data: result,
  });
});

const getSpecificCqMarking = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.body;
  const { examId } = req.body;
  const { questionId } = req.body;
  if (!studentId || !examId || !questionId) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Provide valid student id, exam id, question id",
    );
  }
  const result = await cqMarkingService.getSpecifUserCqMarking(
    studentId,
    examId,
    questionId,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Marking fatched successfully",
    data: result,
  });
});

const updateCqMarking = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ");
  }
  const payload = req.body;
  delete payload._id;
  const result = await cqMarkingService.updateCqMarking(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Marking updated successfully",
    data: result,
  });
});

const deleteCqMarking = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ");
  }
  const result = await cqMarkingService.deleteCqMarking(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Marking deleetd successfully",
    data: "",
  });
});

export const cqMarkingContoller = {
  createCqMarking,
  updateCqMarking,
  deleteCqMarking,
  getAllCqMarking,
  getSpecificCqMarking,
};
