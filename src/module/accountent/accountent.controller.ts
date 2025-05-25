import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { shopManagerService } from "./accountent.service";
import AppError from "../../helpers/AppError";



const getAllShopManager = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await shopManagerService.getShopManager(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Shop Manager getting successfully",
    data: result,
  });
});



const deleteShopMnagaer = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await shopManagerService.deleteShopManager(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "shop manager Deleted successfully",
    data: result,
  });
});

const updateShopMnagaer = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }
  const data = req.body;
  const result = await shopManagerService.updateShopManager(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Shop Mnagaer & Nested User Updated successfully",
    data: result,
  });
});



export const shopManagerController = {
    getAllShopManager,
    updateShopMnagaer,
    deleteShopMnagaer
}