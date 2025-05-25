import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import { Request, Response } from "express";
import OrderModel from "./order.model";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrderWithDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Order Created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await orderService.getAllOrderFromDb(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Orders fetched successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await orderService.updateOrderAndOrderDetailsCommonFields(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderService.deleteOrderWithOrderDetails(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Order deleted successfully",
    data: result,
  });
});

// ✅ Improved Stats Controller with Full Date, Month, Year Filtering Support
const getOrderStats = catchAsync(async (req: Request, res: Response) => {
  const { startDate, endDate, day, month, year } = req.query;

  let matchCondition: any = { isDeleted: false };

  const dayNum = day ? parseInt(day as string, 10) : null;
  const monthNum = month ? parseInt(month as string, 10) : null;
  const yearNum = year ? parseInt(year as string, 10) : null;

  if (startDate && endDate) {
    // ✅ Filter by custom date range
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    end.setHours(23, 59, 59, 999);
    matchCondition.createdAt = { $gte: start, $lte: end };

  } else if (dayNum && monthNum && yearNum) {
    // ✅ Filter by specific day
    const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
    matchCondition.createdAt = { $gte: start, $lte: end };

  } else if (monthNum && yearNum) {
    // ✅ Filter by specific month
    const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999)); // last day of the month
    matchCondition.createdAt = { $gte: start, $lte: end };

  } else if (yearNum) {
    // ✅ Filter by year
    const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
    end.setHours(23, 59, 59, 999);
    matchCondition.createdAt = { $gte: start, $lte: end };
  }

  const orders = await OrderModel.find(matchCondition)
    .populate("userId", "name phone")
    .populate("productId", "title price");

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Order stats fetched successfully",
    data: {
      total: orders.length,
      orders,
    },
  });
});


export const orderController = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderStats,
};
