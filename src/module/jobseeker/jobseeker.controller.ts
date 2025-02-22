
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { jobSeekerService } from "./jobseeker.service";
import { StatusCodes } from 'http-status-codes';



const createJobSeeker = catchAsync(async(req, res) => {
    const result = await jobSeekerService.createJobSeeker(req.body);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'JobSeeker created successfully',
        data: result,
      })
  
});

const getJobSeeker = catchAsync(async(req, res) => {
    const result = await jobSeekerService.getJobSeeker();
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'JobSeeker getting successfully',
        data: result,
    })
})

const getSingleJobSeeker = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await jobSeekerService.getSingleJobSeeker(id);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single JobSeeker getting successfully',
        data: result,
    })
})



const updateJobSeeker = catchAsync(async(req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await jobSeekerService.updateJobSeeker(id, payload);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'JobSeeker updated successfully',
        data: result,
    })
})


const deleteJobSeeker = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await jobSeekerService.deleteJobSeeker(id);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'JobSeeker deleted successfully',
        data: result,
    })
})




export const jobSeekerController = {
    createJobSeeker,
    getJobSeeker,
    updateJobSeeker,
    getSingleJobSeeker,
    deleteJobSeeker,
 
}