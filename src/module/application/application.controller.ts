import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { applicationService } from "./application.service";


const cerateApplication = catchAsync(async(req, res) =>{
    const payload = req.body;
    const result = await applicationService.createApplication(payload);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Application Created Successfully',
        data: result,
    })
});

const getAllApplications = catchAsync(async (req, res) => {
    const result = await applicationService.getAllApplications();
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Applications getting successfully',
        data: result,
    })
});

const getSingleApplication = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await applicationService.getSingleApplication(id);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Application getting successfully',
        data: result,
    })
});

const updateApplication = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await applicationService.updateApplication(id, payload);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Application updated successfully',
        data: result,
    })
});

const deleteApplication = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await applicationService.deleteApplication(id);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Application deleted successfully',
        data: result,
    })
})

export const applicationController = {
    cerateApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication,
 
}