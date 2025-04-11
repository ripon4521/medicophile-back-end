import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { gapsAnserService } from "./gapAnswer.service";

const createGapAnswer = catchAsync(async (req, res) => {
  const result = await gapsAnserService.cretaeGapsAnswer(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Gap Answer Created successfully",
    data: result,
  });
});

const deleteGapAnswer = catchAsync(async (req, res) => {
  const { _id } = req.body;
  const result = await gapsAnserService.deleteGapsAnswer(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Answer deletes successfully",
    data: result,
  });
});

const getAllGapAnswer = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await gapsAnserService.getAllGapsAnswer(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Answer fatched successfully",
    data: result,
  });
});

const updateGapAsnser = catchAsync(async (req, res) => {
  const { _id } = req.body;
  const payload = req.body;
  delete payload._id;
  const result = await gapsAnserService.updateGapsAnser(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Gap Answer Updated successfully",
    data: result,
  });
});

export const gapAnswerControlller = {
  createGapAnswer,
  deleteGapAnswer,
  updateGapAsnser,
  getAllGapAnswer,
};
