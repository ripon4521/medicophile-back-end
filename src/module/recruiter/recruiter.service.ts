import { IRecruiter } from "./recruiter.interface";
import { RecruiterModel } from "./recruiter.model";


const createRecruiter = async ( payload:IRecruiter) => {
    const result = await RecruiterModel.create(payload);
    return result;
}

const getRecruiters = async () => {
    const result = await RecruiterModel.find().populate('user');
    return result;
}

const getSingleRecruiter = async (_id: string) => {
    const result = await RecruiterModel.findOne({_id}).populate('user');
    return result;
}

const updateRecruiter = async (_id: string, payload: IRecruiter) => {
    const result = await RecruiterModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteRecruiter = async (_id: string) => {
    const result = await RecruiterModel.findOneAndDelete({_id});
    return result;
}

export const recuirterService = {
    createRecruiter,
    getRecruiters,
    getSingleRecruiter,
    updateRecruiter,
    deleteRecruiter,
}