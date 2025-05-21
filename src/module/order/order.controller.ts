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



export const orderController = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  
};
