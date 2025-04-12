import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogCategoryService } from "./blogCategory.service";
import AppError from "../../helpers/AppError";

const createBlogCategory = catchAsync(async (req, res) => {
  const result = await blogCategoryService.createBlogCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Blog Category Created successfully",
    data: result,
  });
});

const getAllBlogCategory = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogCategoryService.getAllBlogCategory(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Blog Category fathced successfully",
    data: result,
  });
});

const getSingleBlogCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const result = await blogCategoryService.getSingleBlogCatgeory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Blog Category fathced successfully",
    data: result,
  });
});

const updateBlogCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const payload = req.body;
  const result = await blogCategoryService.updateBlogCategory(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Blog Category updated successfully",
    data: result,
  });
});

const deleteBlogCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
  }
  const result = await blogCategoryService.deleteBlogCategory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Blog Category Deleted successfully",
    data: result,
  });
});

export const blogCategoryController = {
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
  getAllBlogCategory,
  getSingleBlogCategory,
};
