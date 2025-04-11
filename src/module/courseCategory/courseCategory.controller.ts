import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseCategoryService } from "./courseCategory.service";

const createCourseCategory = catchAsync(async (req, res) => {
  const result = await courseCategoryService.createCourseCategory(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Course Category Created successfully",
    data: result,
  });
});

const getAllCourseCategory = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseCategoryService.getAllCourseCategory(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Category fathced successfully",
    data: result,
  });
});

const getSingleCourseCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await courseCategoryService.getSingleCourseCatgeory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Category fathced successfully",
    data: result,
  });
});

const updateCourseCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = req.body;
  const result = await courseCategoryService.updateCourseCategory(
    slug,
    payload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Category updated successfully",
    data: result,
  });
});

const deletdCourseCategory = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await courseCategoryService.deleteCourseCategory(slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Course Category Deleted successfully",
    data: result,
  });
});

export const coursCategoryController = {
  createCourseCategory,
  getAllCourseCategory,
  updateCourseCategory,
  getSingleCourseCategory,
  deletdCourseCategory,
};
