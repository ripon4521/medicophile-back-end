import { TFeedback } from "./feedback.interface";
import { feedbackModel } from "./feedback.model";


const createFeedbackIntoDB =async (payload:TFeedback) => {
    const result = await feedbackModel.create(payload);
    return result;
}

const getAllFeedbackFromDB = async () => {
    const result = await feedbackModel.find();
    return result;
}


export const feedbackService = {
    createFeedbackIntoDB,
    getAllFeedbackFromDB,
}