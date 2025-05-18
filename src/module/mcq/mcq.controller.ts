import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mcqQuestionService } from "./mcq.service";
import AppError from "../../helpers/AppError";

const createMcq = catchAsync(async (req, res) => {
  const result = await mcqQuestionService.createMcq(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "MCQ Created successfully",
    data: result,
  });
});

const getAllMCQ = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await mcqQuestionService.getAllMcq(query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "MCQ fetched successfully",
    data: result,
  });
});

const updateMCQ = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "please provide a valid id in params",
    );
  }
  const payload = req.body;
  const result = await mcqQuestionService.updateMcq(id, payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "MCQ updated successfully",
    data: result,
  });
});

const deleteMCQ = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "please provide a valid id in params",
    );
  }
  const result = await mcqQuestionService.deleteMcq(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "MCQ deleted successfully",
    data: result,
  });
});

const getSpeecificMccq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await mcqQuestionService.getSpcificMcq(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Referanc MCQ  fatched successfully",
    data: result,
  });
});

const getSingleMcq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await mcqQuestionService.getSingleMcq(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " MCQ  fatched successfully",
    data: result,
  });
});

export const mcqQuestiionController = {
  createMcq,
  getAllMCQ,
  updateMCQ,
  deleteMCQ,
  getSingleMcq,
  getSpeecificMccq,
};
