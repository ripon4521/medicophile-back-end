import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.services";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Categoty Created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
    const query = req.query;
  const result = await categoryService.getallCategory(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Categoty Get successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.singleCategoryget(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Categoty Get successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Categoty Deleted successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await categoryService.updateCatgory(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Categoty Updated successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
};
