import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { canteenstaffService } from "./canteenstaff.service";

const getAllCanteenstaff = catchAsync(async (req, res) => {
    const students = await canteenstaffService.getAllCanteenstaffs();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Students Get successfully',
        data: students,
      }
      )
});

const getSingleCanteenstaff = catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await canteenstaffService.getCanteenstaffById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Student Get successfully',
        data: student,
    });
})

const updatedCanteenstaff = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedStudent = await canteenstaffService.updateCanteenstaffFromDb(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Student Updated successfully',
        data: updatedStudent,
    });
})

const deleteCanteenstaff = catchAsync(async (req, res) => {
    const { id } = req.params;
   const result =  await canteenstaffService.deleteCanteenstaffById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Student Deleted successfully',
        data:result
    });
})

export const canteenstaffsController = {
    getAllCanteenstaff,
    getSingleCanteenstaff,
    updatedCanteenstaff,
    deleteCanteenstaff,
}