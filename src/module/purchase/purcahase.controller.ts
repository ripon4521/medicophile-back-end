import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { purchaseService } from "./purchase.service";
import { PurchaseModel } from "./purchase.model";
import AppError from "../../helpers/AppError";
import { Request, Response } from "express";

const createPurchase = catchAsync(async (req, res) => {
  const result = await purchaseService.createPurchase(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Purchase created successfully",
    data: result,
  });
});

const getAllPurchase = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await purchaseService.getAllPurchase(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase get successfully",
    data: result,
  });
});

const deletePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const purchas = await PurchaseModel.findOne({ _id: id });
  if (!purchas) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid id. Please provide a valid id",
    );
  }
  const result = await purchaseService.deletePurchase(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase deleted successfully",
    data: result,
  });
});

const updatePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const purchas = await PurchaseModel.findOne({ _id: id });
  if (!purchas) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid id. Please provide a valid id",
    );
  }
  const result = await purchaseService.updatePurchase(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Purchase updated successfully",
    data: result,
  });
});




export const getPurchaseStats = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, day, month, year } = req.query;

    let matchCondition: any = {
      isDeleted: false,
    };

    const dayNum = day ? parseInt(day as string, 10) : null;
    const monthNum = month ? parseInt(month as string, 10) : null;
    const yearNum = year ? parseInt(year as string, 10) : null;

    if (startDate && endDate) {
      // ✅ startDate & endDate filter
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setUTCHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (dayNum && monthNum && yearNum) {
      // ✅ Specific day
      const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
      const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (monthNum && yearNum) {
      // ✅ Whole month
      const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
      const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999)); // last day of month
      matchCondition.createdAt = { $gte: start, $lte: end };

    } else if (yearNum) {
      // ✅ Whole year
      const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
      const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
      end.setUTCHours(23, 59, 59, 999);
      matchCondition.createdAt = { $gte: start, $lte: end };
    }

    const purchases = await PurchaseModel.find(matchCondition)
      .populate("studentId", "name phone")
      .populate("courseId", "title")
      .populate("issuedBy", "name");

    res.status(200).json({
      success: true,
      total: purchases.length,
      data: purchases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};




export const purchaseController = {
  createPurchase,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
  getPurchaseStats
};
