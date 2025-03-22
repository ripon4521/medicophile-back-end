import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { classscheduleService } from "./classschedule.service";

const createClassschedule = catchAsync(async (req, res) => {
    const payload = req.body
    const students = await classscheduleService.createClassscheduleIntoDB(payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Classschedule Create successfully',
        data: students,
    }

    )
});

const getAllClassschedule = catchAsync(async (req, res) => {
    const students = await classscheduleService.getAllClassscheduleIntoDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Classschedule  Get successfully',
        data: students,
    }

    )
});

const getsingleClassschedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await classscheduleService.getsingleClassscheduleById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Classschedule Get successfully',
        data: student,
    });
})

const updateClassschedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    
    const updatedStudent = await classscheduleService.updateClassscheduleInDb(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Classschedule Updated successfully',
        data: updatedStudent,
    });
})

const deleteClassschedule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await classscheduleService.deleteClassscheduleFromDb(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Classschedule Deleted successfully',
        data: result
    });
})

export const classscheduleController = {
    createClassschedule,
    getAllClassschedule,
    getsingleClassschedule,
    updateClassschedule,
    deleteClassschedule,
}