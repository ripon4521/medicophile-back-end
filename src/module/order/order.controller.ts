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
  const { startDate, endDate, month, year } = req.query;

  let matchCondition: any = { isDeleted: false };

  if (startDate && endDate) {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    end.setHours(23, 59, 59, 999); // include full end day

    matchCondition.createdAt = {
      $gte: start,
      $lte: end,
    };
  } else if (month && year) {
    const m = String(month).padStart(2, "0"); // make sure month is 2-digit
    const start = new Date(`${year}-${m}-01T00:00:00.000Z`);
    const end = new Date(new Date(start).setMonth(start.getMonth() + 1));
    end.setHours(23, 59, 59, 999);

    matchCondition.createdAt = {
      $gte: start,
      $lte: end,
    };
  } else if (year) {
    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${+year + 1}-01-01T00:00:00.000Z`);
    end.setHours(23, 59, 59, 999);

    matchCondition.createdAt = {
      $gte: start,
      $lte: end,
    };
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
