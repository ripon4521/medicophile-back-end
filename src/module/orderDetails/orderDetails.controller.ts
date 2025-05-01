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

  export const orderDetailsController = {
    getAllOrderDetails
  }