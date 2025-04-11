import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";
import AppError from "../../helpers/AppError";


const createBlog = catchAsync(async (req, res) => {
    const result = await blogService.createBlog(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Blog  Created successfully",
      data: result,
    });
  });


  const getAllBlog = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await blogService.getAllBlog(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog  fathced successfully",
      data: result,
    });
  });
  

  const getSingleBlog = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug")
    }
    const result = await blogService.getSingleBlog(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog  fathced successfully",
      data: result,
    });
  });


  const updateBlog = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug")
    }
    const payload = req.body;
    const result = await blogService.updateBlog(
      slug,
      payload,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog  updated successfully",
      data: result,
    });
  });


  const deleteBlog = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug")
    }
    const result = await blogService.deleteBlog(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog  Deleted successfully",
      data: result,
    });
  });
  

  export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
    getSingleBlog
  }