import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { gapsQuestionService } from "./gapsQuestion.service";
import AppError from "../../helpers/AppError";

const createGapQuestion = catchAsync(async (req, res) => {
  const result = await gapsQuestionService.cretaeGapsQuestion(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Gap Question Created successfully",
    data: result,
  });
});

const updateGapQuestion = catchAsync(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Provide _id in body");
  }
  const payload = req.body;
  delete payload._id;
  const result = await gapsQuestionService.updateGapsQuestion(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Question updated successfully",
    data: result,
  });
});

const deleteGapQuestion = catchAsync(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Provide _id in body");
  }
  const result = await gapsQuestionService.deleteGapsQuestion(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Question deleted successfully",
    data: result,
  });
});

const getAllGapQuestions = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await gapsQuestionService.getAllGapsQuestion(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Question fatched successfully",
    data: result,
  });
});

const getSpeecificGaps = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await gapsQuestionService.getSpcificGaps(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc Gaps  fatched successfully",
    data: result,
  });
});

const getSingleGaps = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await gapsQuestionService.getSingleGaps(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Gaps  fatched successfully",
    data: result,
  });
});

export const gapsQuestionController = {
  createGapQuestion,
  updateGapQuestion,
  deleteGapQuestion,
  getAllGapQuestions,
  getSpeecificGaps,
  getSingleGaps
};
