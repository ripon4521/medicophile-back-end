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
})

export const jobController ={
    createJob,
    getAllJobs,
 };
