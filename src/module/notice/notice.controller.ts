import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { noticeServices } from "./notice.service";

const createNotice = catchAsync(async (req, res) => {
  const result = await noticeServices.createNotice(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Notice Created successfully",
    data: result,
  });
});

const getAllNotice = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await noticeServices.getAllNoticeFromDb(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Notice fatched successfully",
    data: result,
  });
});

const getSingleNotice = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await noticeServices.getSingleNotice(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Notice fatched successfully",
    data: result,
  });
});

const deleteNotice = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await noticeServices.deleteNotice(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Notice deleted successfully",
    data: result,
  });
});

const updateNotice = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await noticeServices.updateNotice(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Notice updated successfully",
    data: result,
  });
});

export const noticeController = {
  createNotice,
  updateNotice,
  deleteNotice,
  getAllNotice,
  getSingleNotice,
};
