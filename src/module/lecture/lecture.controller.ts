import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { lectureServices } from "./lecture.service";

const createLecture = catchAsync(async (req, res) => {
  const result = await lectureServices.createLecture(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Lecture Created successfully",
    data: result,
  });
});
const getLecture = catchAsync(async (req, res) => {
  const result = await lectureServices.getAllLecture();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Lecture fatched successfully",
    data: result,
  });
});
const getSingleLecture = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await lectureServices.getSingleLecture(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Single Lecture fatched successfully",
    data: result,
  });
});
const updateLecture = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await lectureServices.updateLecture(slug, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Lecture Updated successfully",
    data: result,
  });
});
const deleteLecture = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await lectureServices.deleteLecture(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Lecture Deleted successfully",
    data: result,
  });
});

export const lectureController = {
  createLecture,
  getLecture,
  getSingleLecture,
  deleteLecture,
  updateLecture,
};
