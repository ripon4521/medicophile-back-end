import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseReveiwService } from "./courseReview.service";



const createCourseReveiw = catchAsync(async (req, res) => {
    const result = await courseReveiwService.createCourseReview(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Course Reveiw Created successfully",
      data: result,
    });
  });


  const getAllCourseReview = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await courseReveiwService.getAllCourseReveiw(query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Course Reveiw fathced successfully",
      data: result,
    });
  });


   const updateCourseReview = catchAsync(async (req, res) => {
      const { id } = req.params;
      const payload = req.body;
      const result = await courseReveiwService.updateCourseReview(
        id,
        payload,
      );
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Course Review updated successfully",
        data: result,
      });
    });


    const deleteCourseReveiw = catchAsync(async (req, res) => {
        const result = await courseReveiwService.deleteCourseReveiw(req.params.id);
        sendResponse(res, {
          statusCode: StatusCodes.OK,
          message: "Course Review deleted successfully",
          data: result,
        });
      });


        const getSingleCourseReview = catchAsync(async (req, res) => {
          const { courseId } = req.params;
          const result = await courseReveiwService.getSingleCourseReveiw(courseId);
          sendResponse(res, {
            statusCode: StatusCodes.OK,
            message: "Course Review fatched successfully",
            data: result,
          });
        });


        export const courseReveiwController = {
            createCourseReveiw,
            deleteCourseReveiw,
            updateCourseReview,
            getAllCourseReview,
            getSingleCourseReview
        }