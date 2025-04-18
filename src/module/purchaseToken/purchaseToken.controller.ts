import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { purchaseTokenService } from "./purchaseToken.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createPurchaseToken = catchAsync(async(req:Request,res:Response) => {
    const payload =req.body;
    const result = await purchaseTokenService.createPurchaseToken(payload);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Purchase Token Created successfully",
        data: result,
      });
})


export const purchaseTokenCOntroller = {
    createPurchaseToken
}