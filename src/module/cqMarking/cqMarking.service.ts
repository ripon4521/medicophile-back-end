import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqMarking } from "./cqMarking.interface";
import CqMarkingModel from "./cqMarking.model";


const createCqMarking = async (payload:ICqMarking) => {
    const result = await CqMarkingModel.create(payload);
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create Cq Marking. Please cheack and try again")
    }
    return result;
}


const getAllCqMarking = async () => {
    const result = await CqMarkingModel.find({isDeleted:false}).populate('studentId').populate('examId').populate('questionId');
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get Cq Marking. Please cheack and try again")
    }
    return result;
}


const updateCqMarking = async (_id:string, payload:ICqMarking) => {

    const update = await CqMarkingModel.findOneAndUpdate({_id}, payload , {
        runValidators:true,
        new:true
    });
    if (!update) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update Cq Marking. Please cheack and try again")
    }
    return update;
}



const deleteCqMarking = async (_id:string) => {

    const update = await CqMarkingModel.findOneAndUpdate({_id}, {
        isDeleted:true,
        deletedAt:new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    } , {
        runValidators:true,
        new:true
    });
    if (!update) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete Cq Marking. Please cheack and try again")
    }
    return update;
}



export const cqMarkingService = {
    createCqMarking,
    deleteCqMarking,
    updateCqMarking,
    getAllCqMarking
}

