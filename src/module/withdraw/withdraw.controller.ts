import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { referWithdrawService } from "./withdraw.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const createReferWithdraw = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await referWithdrawService.createReferWithdraw(payload);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Refer Withdraw Cretaed Successfully",
      data: result,
    });
  });


  const getAllReferWithdraw = catchAsync(async (req: Request, res: Response) => {
      const query = req.query;
      const result = await referWithdrawService.getAllReferWithdraw(query);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Refer Withdraw get successfully",
        data: result,
      });
    });


  const getSingleReferWithdraw = catchAsync(async (req: Request, res: Response) => {
            const { id } = req.params;
            if (!id) {
              throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
            }
            const result = await referWithdrawService.getSingleReferWithdraw(id);
            sendResponse(res, {
              statusCode: StatusCodes.OK,
              message: "refer withdraw get successfully",
              data: result,
            });
          });


          const deleteReferWithdraw = catchAsync(async (req: Request, res: Response) => {
                  const { id } = req.params;
                  if (!id) {
                    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
                  }
                  const result = await referWithdrawService.getSingleReferWithdraw(id);
                  sendResponse(res, {
                    statusCode: StatusCodes.OK,
                    message: "refer withdraw deleted successfully",
                    data: result,
                  });
                });


                const updateReferWithdraw = catchAsync(async (req, res) => {
                    const {id} = req.params;
                    const payload = req.body;
                    const result = await referWithdrawService.updateReferWithdraw(id,payload);
                    sendResponse(res, {
                      statusCode: StatusCodes.OK,
                      message: "Refer withdraw updated successfully",
                      data: result,
                    });
                  });
                  
    export const withdrawController = {
        createReferWithdraw,
        updateReferWithdraw,
        deleteReferWithdraw,
        getAllReferWithdraw,
        getSingleReferWithdraw
    }