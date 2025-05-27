import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { tokenService } from "./bakash.service";

const createToken = catchAsync(async (req, res) => {
  const result = await tokenService.createToken(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "token  Created successfully",
    data: result,
  });
});


const getToken = catchAsync(async (req, res) => {

  const result = await tokenService.getToken();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "token get successfully",
    data: result,
  });
});



export const tokenController = {
  createToken,
  getToken
}