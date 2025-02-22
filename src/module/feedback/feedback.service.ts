import { TFeedback } from "./feedback.interface";
import { feedbackModel } from "./feedback.model";


const createFeedbackIntoDB =async (payload:TFeedback) => {
    const result = await feedbackModel.create(payload);
    return result;
}

const getAllFeedbackFromDB = async () => {
    const result = await feedbackModel.find().populate('user');
    return result;
}

const getSingleFeedbackFromDB = async (_id:string) => {
    const result = await feedbackModel.findOne({_id}).populate('user');
    return result;
}

const updateFeedbackInDB = async (_id: string, payload: TFeedback) => {
    const result = await feedbackModel.findOneAndUpdate({_id}, payload, {new: true}).populate('user');
    return result;
}

const deleteFeedbackFromDB = async (_id: string) => {
    const result = await feedbackModel.findOneAndDelete({_id});
    return result;
}


export const feedbackService = {
    createFeedbackIntoDB,
    getAllFeedbackFromDB,
    getSingleFeedbackFromDB,
    updateFeedbackInDB,
    deleteFeedbackFromDB,
}