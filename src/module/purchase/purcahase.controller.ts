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
    const {id}= req.params;
    const purchas = await PurchaseModel.findOne({_id:id})
    if (!purchas) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id. Please provide a valid id")
    }
    const result = await purchaseService.deletePurchase(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Purchase deleted successfully",
      data: result,
    });
  });


  const updatePurchase = catchAsync(async (req, res) => {
    const {id}= req.params;
    const payload = req.body;
    const purchas = await PurchaseModel.findOne({_id:id})
    if (!purchas) {
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id. Please provide a valid id")
    }
    const result = await purchaseService.updatePurchase(id, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Purchase updated successfully",
      data: result,
    });
  });



  
  

  export  const purchaseController = {
    createPurchase,
    getAllPurchase,
    deletePurchase,
    updatePurchase
  }