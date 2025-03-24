import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseCategoryService } from "./courseCategory.service";



const createCourseCategory = catchAsync(async(req, res) => {
    const result = await courseCategoryService.createCourseCategory(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Course Category Created successfully',
        data: result,
    });
});

const getAllCourseCategory = catchAsync(async(req, res) => {
    const result = await courseCategoryService.getAllCourseCategory();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Course Category fathced successfully',
        data: result,
    });
});


export const coursCategoryController = {
    createCourseCategory,
    getAllCourseCategory
}