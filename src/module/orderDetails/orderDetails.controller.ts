import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderDetailsService } from "./orderDetails.service";


const getAllOrderDetails = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await orderDetailsService.getAllOrderDetailsFromDb(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Order Details get successfully",
      data: result,
    });
  });


  const updateOrderDetails = catchAsync(async (req, res) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await orderDetailsService.updateOrderDetailsAndOrderStatus(id,payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Order Details updated successfully",
      data: result,
    });
  });



  const deleteOrderDetails = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await orderDetailsService.deleteOrderDeails(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: " Order Details deleted successfully",
      data: result,
    });
  });





  export const orderDetailsController = {
    getAllOrderDetails,
    deleteOrderDetails,
    updateOrderDetails
  }