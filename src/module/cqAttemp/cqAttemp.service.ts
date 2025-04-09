import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqAttemps } from "./cqAttemp.interface";
import CqAttempModel from "./cqAttemp.model";


const createCqAttemps = async (payload:ICqAttemps) => {
    const result = await CqAttempModel.create(payload);
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create Cq Attemps. Please cheack and try again")
    }
    return result;
}

const getAllCqAttemps = async() => {
    const result = await CqAttempModel.find({isDeleted:false}).populate('studentId').populate('examId').populate('checkedBy');
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get Cq Attemps . Please try again")
    }
    return result;
}

const updateCqAttemps = async(_id:string, payload:ICqAttemps) => {
    const update = await CqAttempModel.findOneAndUpdate({_id}, payload, {
        runValidators:true,
        new:true
    })

    if (!update) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update Cq Attemps . Please try again")
    }
    return update
}

const deleteCqAttemps = async (_id:string) => {
    const result = await CqAttempModel.findOneAndUpdate({_id}, {
        isDeleted:true,
        deletedAt:new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new:true
    });
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete Cq Attemps . Please try again")
    }
    return result;
}

export const cqAttemService = {
    createCqAttemps,
    updateCqAttemps,
    deleteCqAttemps,
    getAllCqAttemps
}