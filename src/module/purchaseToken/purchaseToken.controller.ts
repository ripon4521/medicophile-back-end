import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { purchaseTokenService } from "./purchaseToken.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const createPurchaseToken = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await purchaseTokenService.createPurchaseToken(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Purchase Token Created successfully",
    data: result,
  });
});

const getAllPurchaseToken = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await purchaseTokenService.getAllPurchasseToken(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase Token get successfully",
    data: result,
  });
});

const updatePurchaseToken = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const payload = req.body;
  delete payload._id;
  const result = await purchaseTokenService.updatePurchaseToken(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase Token updated successfully",
    data: result,
  });
});

const deletePurchaseToken = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const result = await purchaseTokenService.deletePurchaseToken(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase Token deleted successfully",
    data: result,
  });
});

export const purchaseTokenCOntroller = {
  createPurchaseToken,
  updatePurchaseToken,
  deletePurchaseToken,
  getAllPurchaseToken,
};
