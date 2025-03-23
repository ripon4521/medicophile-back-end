import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { moduleService } from "./modules.service";

const createModule = catchAsync(async (req, res) => {
  const result = await moduleService.createModule(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Module Created successfully",
    data: result,
  });
});

const updateModule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await moduleService.updateModule(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module updated successfully",
    data: result,
  });
});

const deleteModule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await moduleService.deleteModule(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Module deleted successfully",
    data: result,
  });
});

const getSingleModule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await moduleService.getSingleModule(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Module get successfully",
    data: result,
  });
});

const getAllModule = catchAsync(async (req, res) => {
  const result = await moduleService.getAllModule();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Module get successfully",
    data: result,
  });
});

export const modulesController = {
    createModule,
    updateModule,
    deleteModule,
    getAllModule,
    getSingleModule
}