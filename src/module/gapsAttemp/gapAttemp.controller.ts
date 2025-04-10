import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { gapAttempService } from "./gapAttemp.service";


const getAllGapAttemp = catchAsync(async (req, res) => {

    const result = await gapAttempService.getAllGapAttemp();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Gap Attemp fatched successfully",
      data: result,
    });
  });
 
  export const getAttempController = {
    getAllGapAttemp
  }