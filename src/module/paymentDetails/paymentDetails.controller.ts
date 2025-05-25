import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { pamentDetailsService } from "./paymentDetails.service";

const getAllPamentyDetails = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await pamentDetailsService.getAllPaymentDetails(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Payment Details get successfully",
    data: result,
  });
});

export const paymentDetailsController = {
  getAllPamentyDetails,
};
