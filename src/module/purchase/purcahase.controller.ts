import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { purchaseService } from "./purchase.service";
import { PurchaseModel } from "./purchase.model";
import AppError from "../../helpers/AppError";



const createPurchase = catchAsync(async (req, res) => {
    const result = await purchaseService.createPurchase(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Purchase created successfully",
      data: result,
    });
  });


  const getAllPurchase = catchAsync(async (req, res) => {
    const result = await purchaseService.getAllPurchase();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Purchase get successfully",
      data: result,
    });
  });

  const deletePurchase = catchAsync(async (req, res) => {
    const {_id} = req.body;
    const purchas = await PurchaseModel.findOne({_id:_id})
    if (!purchas) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id. Please provide a valid id")
    }
    const result = await purchaseService.deletePurchase(_id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Purchase deleted successfully",
      data: result,
    });
  });
  
  

  export  const purchaseController = {
    createPurchase,
    getAllPurchase,
    deletePurchase
  }