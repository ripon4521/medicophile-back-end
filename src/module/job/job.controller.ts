import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { jobService } from "./job.service";
import { RequestHandler } from "express";


const createJob = catchAsync ( async ( req, res) => {
    const payload = req.body;
    const result = await jobService.createJob(payload);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: 'Job Created successfully',
        data: result,
      })
    
})


const getAllJobs:RequestHandler = catchAsync(async (req, res) => {
    const result = await jobService.getAllJob( req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Jobs getting successfully',
        data: result,
      })
});


const getJobById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await jobService.getSingleJob(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Sigle Job getting successfully',
        data: result,
      })
});


const updateJob = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await jobService.updateJob(id, payload);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Job updated successfully',
        data: result,
      })
})

const deleteJob = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await jobService.deleteJob(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Job deleted successfully',
        data: result,
      })
})

export const jobController ={
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
 };
