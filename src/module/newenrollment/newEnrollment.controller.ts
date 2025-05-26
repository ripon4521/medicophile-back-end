import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrollmentService } from "./newWnrollment.service";

const createEnrollment = catchAsync(async (req, res) => {
  const result = await enrollmentService.createEnrollment(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Enrollment Created successfully",
    data: result,
  });
});

const getEnrollment = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await enrollmentService.getAllEnrollment(query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Enrollment get successfully",
    data: result,
  });
});

const getSingleEnrollment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await enrollmentService.getSingleEnrollment(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Single Enrollment get successfully",
    data: result,
  });
});

const updateEnrollment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await enrollmentService.updateEnrollment(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: " Enrollment Update successfully",
    data: result,
  });
});

const deleteEnrollment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await enrollmentService.deleteEnrollment(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: " Enrollment Delete successfully",
    data: result,
  });
});

export const enrollmentControlleer = {
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getEnrollment,
  getSingleEnrollment,
};
