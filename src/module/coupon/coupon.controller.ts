import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { couponService } from "./coupon.service";
import { Request, Response } from "express";
import AppError from "../../helpers/AppError";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await couponService.createCouponIntoDb(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Coupon Created successfully",
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await couponService.getAllCuponFromDb(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Coupon fatched successfully",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ");
  }
  const payload = req.body;
  delete payload._id;
  const result = await couponService.updateCouponInDb(_id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Coupon updated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.body;
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ");
  }
  const result = await couponService.deleteCouponFromDb(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Coupon deleetd successfully",
    data: "",
  });
});

export const couponController = {
  createCoupon,
  deleteCoupon,
  updateCoupon,
  getAllCoupon,
};
