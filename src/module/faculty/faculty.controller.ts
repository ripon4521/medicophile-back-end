import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultysService } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res) => {
    const students = await facultysService.getAllFacultys();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Faculty Get successfully',
        data: students,
      }
  
      )
});

const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await facultysService.getFacultyById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Student Get successfully',
        data: student,
    });
})

// const updatedFaculty = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const updatedStudent = await facultysService.updateFacultyFromDb(id, req.body);
//     sendResponse(res, {
//         statusCode: StatusCodes.OK,
//         message: 'Student Updated successfully',
//         data: updatedStudent,
//     });
// })

// const deleteFaculty = catchAsync(async (req, res) => {
//     const { id } = req.params;
//    const result =  await facultysService.deleteFacultyById(id);
//     sendResponse(res, {
//         statusCode: StatusCodes.OK,
//         message: 'Student Deleted successfully',
//         data:result
//     });
// })

export const facultysController = {
    getAllFaculty,
    getSingleFaculty,
  
}