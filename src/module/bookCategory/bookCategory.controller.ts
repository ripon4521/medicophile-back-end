import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookCategoryService } from "./bookCategory.service";

const createBookCategory = catchAsync(async (req, res) => {
  const result = await bookCategoryService.createBookCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book Category Created successfully",
    data: result,
  });
});

const updateBookCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await bookCategoryService.updateBookCategory(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book Category updated successfully",
    data: result,
  });
});

const deleteBookCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await bookCategoryService.deleteBookCategory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book Category deleted successfully",
    data: result,
  });
});

const getAllBookCategory = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await bookCategoryService.getAllBookCategory(query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book Category fatched successfully",
    data: result,
  });
});

const getSingleBookCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await bookCategoryService.getSingleBookCategory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Book Category fatched successfully",
    data: result,
  });
});

export const bookCategoryontroller = {
  createBookCategory,
  updateBookCategory,
  deleteBookCategory,
  getAllBookCategory,
  getSingleBookCategory,
};
