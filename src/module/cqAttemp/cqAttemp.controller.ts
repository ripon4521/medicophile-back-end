import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { cqAttemService } from "./cqAttemp.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";


const createCqAttemp = catchAsync(async(req:Request, res : Response) => {
    const payload = req.body;
    const  result = await cqAttemService.createCqAttemps(payload);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "CQ Attemp Created successfully",
        data: result,
      });
})

const getAllCqAttemp = catchAsync(async(req:Request, res : Response) => {
    const  result = await cqAttemService.getAllCqAttemps();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "CQ Attemp fatched successfully",
        data: result,
      });
})

const updateCqAttemp = catchAsync(async(req:Request, res : Response) => {
    const {_id}= req.body;
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ")
    }
    const payload = req.body;
    delete payload._id;
    const  result = await cqAttemService.updateCqAttemps(_id, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "CQ Attemp updated successfully",
        data: result,
      });
})

const deleteCqAttemp = catchAsync(async(req:Request, res : Response) => {
    const {_id}= req.body;
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id ")
    }
    const  result = await cqAttemService.deleteCqAttemps(_id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "CQ Attemp deleetd successfully",
        data: '',
      });
})

export const cqAttempController = {
    createCqAttemp,
    updateCqAttemp,
    deleteCqAttemp,
    getAllCqAttemp
}