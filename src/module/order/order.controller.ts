import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";


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
  

  export const orderController = {
    createOrder,
    getAllOrders
  }