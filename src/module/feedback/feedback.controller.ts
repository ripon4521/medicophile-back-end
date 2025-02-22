
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { feedbackService } from "./feedback.service";



const createFeedback = catchAsync(async (req, res) => {
    console.log(req.body);

    const result = await feedbackService.createFeedbackIntoDB(req.body);
 sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Feedback created successfully',
      data: result,
    })

});


const getAllFeedback = catchAsync(async (req, res) => {
    const result = await feedbackService.getAllFeedbackFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Feedbacks fetched successfully',
        data: result,
    })
    
});

const getFeedbackById = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const result = await feedbackService.getSingleFeedbackFromDB(id);
    console.log(result)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Single Feedback fetched successfully',
        data: result,
    })
});


const updateFeedback = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedFeedback = req.body;
    const result = await feedbackService.updateFeedbackInDB(id, updatedFeedback);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Feedback updated successfully',
        data: result,
    })
});


const deleteFeedback = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await feedbackService.deleteFeedbackFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Feedback deleted successfully',
        data: result,
    })
});


export const feedbackController = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
}