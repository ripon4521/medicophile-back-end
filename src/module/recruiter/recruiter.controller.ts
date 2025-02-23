import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { recuirterService } from "./recruiter.service";


const createRecruiterIntoDB = catchAsync(async (req, res) =>{
    const result = await recuirterService.createRecruiter(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Recruiter Created Successfully',
        data: result,
    })
})

const getAllRecruiters = catchAsync(async (req, res) => {
    const result = await recuirterService.getRecruiters();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'All Recruiters Fetched Successfully',
        data: result,
    })
})

const getRecruiterById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await recuirterService.getSingleRecruiter(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Recruiter Fetched Successfully',
        data: result,
    })
})

const updateRecruiterById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const paylaoad = req.body;
    const result = await recuirterService.updateRecruiter(id, paylaoad);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Recruiter Updated Successfully',
        data: result,
    })
})

const deleteRecruiterById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await recuirterService.deleteRecruiter(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Recruiter Deleted Successfully',
        data: result,
    })
})

export const recruiterController = {
    createRecruiterIntoDB,
    getAllRecruiters,
    getRecruiterById,
    updateRecruiterById,
    deleteRecruiterById,
 
}