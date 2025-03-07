import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { researchService } from "./research.service";

const createResearch  = catchAsync(async(req, res) =>{
    const result = await researchService.createResearchIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Research Created Successfully",
        data: result,
      });
})

const getResearch = catchAsync(async(req, res) =>{
    const result = await researchService.getAllResearch();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Events Getting Successfully",
        data: result,
      });
})

const getSingleResearch = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await researchService.getResearchById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Getting Successfully",
        data: result,
      });
})

const updateResearch = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await researchService.updateResearchById(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Updated Successfully",
        data: result,
      });   
})

const deleteResearch = catchAsync(async(req, res) =>{
    const { id } = req.params;
    const result = await researchService.deleteResearchById(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Event Deleted Successfully",
        data: result,
      });
})

export const researchController = {
    createResearch,
    getResearch,
    getSingleResearch,
    updateResearch,
    deleteResearch,
 };
