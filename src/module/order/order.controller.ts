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
    message: " Orders get successfully",
    data: result,
  });
});



const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await orderService.updateOrderAndOrderDetailsCommonFields(
    id,
    payload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderService.deleteOrderWithOrderDetails(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Order deleted successfully",
    data: result,
  });
});







export const getOrderStats = async (req: Request, res: Response) => {
  try {
    const { day, month, year } = req.query;

    let matchCondition: any = {
      isDeleted: false,
    };

    const dayNum = day ? Number(day) : null;
    const monthNum = month ? Number(month) : null;
    const yearNum = year ? Number(year) : null;

    if (dayNum && monthNum && yearNum) {
      const startDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
      const endDate = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
      matchCondition.createdAt = { $gte: startDate, $lte: endDate };
    } else if (monthNum && yearNum) {
      const startDate = new Date(Date.UTC(yearNum, monthNum - 1, 1));
      const endDate = new Date(Date.UTC(yearNum, monthNum, 1));
      matchCondition.createdAt = { $gte: startDate, $lt: endDate };
    } else if (yearNum) {
      const startDate = new Date(Date.UTC(yearNum, 0, 1));
      const endDate = new Date(Date.UTC(yearNum + 1, 0, 1));
      matchCondition.createdAt = { $gte: startDate, $lt: endDate };
    }

    const orders = await OrderModel.find(matchCondition)
      .populate("userId", "name phone")
      .populate("productId", "title price");

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};




export const orderController = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderStats
  
};
