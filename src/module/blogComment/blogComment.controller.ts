import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogCommentService } from "./blogComment.service";
import AppError from "../../helpers/AppError";


const createBlogComment = catchAsync(async (req, res) => {
    const result = await blogCommentService.createBlogComment(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Blog Comment Created successfully",
      data: result,
    });
  });


  const getAllBlogComment = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await blogCommentService.getAllBlogComment(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog Comment fathced successfully",
      data: result,
    });
  });


  const getSingleBlogComment = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const result = await blogCommentService.getSingleBlogComment(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Single Blog Comment fathced successfully",
      data: result,
    });
  });
  

  
  const updateBlogComment = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const payload = req.body;
    const result = await blogCommentService.updateBlogComment(slug, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog comment updated successfully",
      data: result,
    });
  });


  const deleteBlogComment = catchAsync(async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid slug");
    }
    const result = await blogCommentService.deleteBlogComment(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog Comment Deleted successfully",
      data: result,
    });
  });


  const getSpecificBlogComment = catchAsync(async (req, res) => {
    const { blogId } = req.body;
    if (!blogId) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Please provide a valid blogId");
    }
    const result = await blogCommentService.getSpecificBlogComment(blogId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Blog Comment get successfully",
      data: result,
    });
  });



  export const blogCommentController = {
    createBlogComment,
    updateBlogComment,
    getAllBlogComment,
    getSingleBlogComment,
    deleteBlogComment,
    getSpecificBlogComment
  }