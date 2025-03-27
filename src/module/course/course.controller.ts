import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";
import AppError from "../../helpers/AppError";

const createCourse = catchAsync(async(req, res) => {
    const result = await courseService.createCourseIntoDb(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Course Created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async(req, res) => {
    const query = req.query;

    const result = await courseService.getAllCoursesFromDb(query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Courses fetched successfully',
        data: result,
    });
})

const getSingleCourse = catchAsync(async(req, res) => {

    const result = await courseService.getCourseById(req.params.slug);
    if (!result) {
        throw new Error('Course not found');
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course fetched successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async(req, res) => {
    const result = await courseService.updateCourseInDb(req.params.slug, req.body);
    if (!result) {
        throw new Error('Course not found');
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course updated successfully',
        data: result,
    });
})

const deleteCourse = catchAsync(async(req, res) => {
    const result = await courseService.deleteCourseFromDb(req.params.slug);
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST,'Course not found, please reload and try again');
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course deleted successfully',
        data: result,
    });
})

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
 
}