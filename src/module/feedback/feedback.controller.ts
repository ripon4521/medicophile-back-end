
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { feedbackService } from "./feedback.service";



const createFeedback = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await feedbackService.createFeedbackIntoDB(payload);
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


export const feedbackController = {
    createFeedback,
    getAllFeedback,
}