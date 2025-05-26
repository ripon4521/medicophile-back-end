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
  const { startDate, endDate, day, month, year, productSlug } = req.query;

  let matchCondition: any = { isDeleted: false };

  const dayNum = day ? parseInt(day as string, 10) : null;
  const monthNum = month ? parseInt(month as string, 10) : null;
  const yearNum = year ? parseInt(year as string, 10) : null;

  // Filter by date conditions
  if (startDate && endDate) {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    end.setHours(23, 59, 59, 999);
    matchCondition.createdAt = { $gte: start, $lte: end };
  } else if (dayNum && monthNum && yearNum) {
    const start = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum, monthNum - 1, dayNum, 23, 59, 59, 999));
    matchCondition.createdAt = { $gte: start, $lte: end };
  } else if (monthNum && yearNum) {
    const start = new Date(Date.UTC(yearNum, monthNum - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum, monthNum, 0, 23, 59, 59, 999));
    matchCondition.createdAt = { $gte: start, $lte: end };
  } else if (yearNum) {
    const start = new Date(Date.UTC(yearNum, 0, 1, 0, 0, 0));
    const end = new Date(Date.UTC(yearNum + 1, 0, 1, 0, 0, 0));
    end.setHours(23, 59, 59, 999);
    matchCondition.createdAt = { $gte: start, $lte: end };
  }

  // Aggregation pipeline
  const pipeline: any[] = [
    { $match: matchCondition },

    // Join with Product
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
  ];

  // Filter by productSlug if provided
  if (productSlug) {
    pipeline.push({
      $match: {
        "product.slug": { $regex: new RegExp(`^${productSlug}$`, "i") },
      },
    });
  }

  // Join with User
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  });
  pipeline.push({ $unwind: "$user" });

  // Final projection
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      phone: 1,
      address: 1,
      status: 1,
      paymentStatus: 1,
      paymentInfo: 1,
      subTotal: 1,
      discount: 1,
      totalAmount: 1,
      paidAmount: 1,
      quantity: 1,
      shiping: 1,
      createdAt: 1,
      product: { title: 1, slug: 1, price: 1 },
      user: { name: 1, phone: 1 },
    },
  });

  const orders = await OrderModel.aggregate(pipeline);

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
