import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { mediaService } from "./media.service";
import AppError from "../../helpers/AppError";

const createMedia = catchAsync(async (req, res) => {
  const result = await mediaService.createMedia(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Media Created Successfully",
    data: result,
  });
});

const getAllMedia = catchAsync(async (req, res) => {
  const result = await mediaService.getAllMedia();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media fatched Successfully",
    data: result,
  });
});

const getSingleMedia = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide valid slug");
  }
  const result = await mediaService.getSingleMedia(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Media fatched successfully",
    data: result,
  });
});

const deleteMedia = catchAsync(async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide valid slug");
  }
  const result = await mediaService.deleteMedia(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Media deleted successfully",
    data: result,
  });
});

const updateMedia = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  if (!slug) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide valid slug");
  }
  const result = await mediaService.updateMedia(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Media updated successfully",
    data: result,
  });
});

export const mediaController = {
  createMedia,
  updateMedia,
  deleteMedia,
  getAllMedia,
  getSingleMedia,
};
