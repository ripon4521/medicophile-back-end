import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { cqQuestionService } from "./classQuizeQuestion.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCqQuestion = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await cqQuestionService.createCqQuestion(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "CQ Question Created successfully",
    data: result,
  });
});

const getAllCqQuestion = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await cqQuestionService.getALlCqQuestion(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Question fatched successfully",
    data: result,
  });
});

const updateCqQuestion = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const payload = req.body;
  delete payload._id;
  const update = await cqQuestionService.updateCqQuestion(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Question updated successfully",
    data: update,
  });
});

const deleteCqQuestion = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const result = await cqQuestionService.deleteCqQuestion(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "CQ Question deleted successfully",
    data: "",
  });
});

const getSpeecificCaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await cqQuestionService.getSpcificCq(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc Cq  fatched successfully",
    data: result,
  });
});

export const cqQuestionController = {
  createCqQuestion,
  updateCqQuestion,
  deleteCqQuestion,
  getAllCqQuestion,
  getSpeecificCaq,
};
