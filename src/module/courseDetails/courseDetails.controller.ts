import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseDetailsService } from "./courseDetails.service";

const createCourseDetails = catchAsync(async (req, res) => {
  const result = await courseDetailsService.createCourseDetails(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Course Details Created successfully",
    data: result,
  });
});

const getAllCourseDetails = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseDetailsService.getAllCourseDetails(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Details fathced successfully",
    data: result,
  });
});

const updateCourseDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await courseDetailsService.updateCourseDetails(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Details updated successfully",
    data: result,
  });
});

const deleteCourseDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseDetailsService.deleteCourseDetails(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Details deleted successfully",
    data: result,
  });
});

const getSingleCourseDetails = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseDetailsService.getSingleCourseDetails(courseId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Details fatched successfully",
    data: result,
  });
});

export const courseDetailsController = {
  createCourseDetails,
  updateCourseDetails,
  deleteCourseDetails,
  getAllCourseDetails,
  getSingleCourseDetails,
};
