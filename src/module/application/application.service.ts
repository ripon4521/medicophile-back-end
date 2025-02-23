import { IApplication } from "./application.interface";
import { ApplicationModel } from "./application.model";

const createApplication = async(payload:IApplication) =>{
    const result = await ApplicationModel.create(payload);
    return result;
}

const getAllApplications = async() => {
    const result = await ApplicationModel.find().populate('job')
    .populate({
        path: 'job_seeker',
        populate: { path: 'user' },
      });
    return result;
}

const getSingleApplication = async(_id:string) => {
    const result = await ApplicationModel.findOne({_id}).populate('job')
    .populate({
        path: 'job_seeker',
        populate: { path: 'user' },
      });
    return result;
}

const updateApplication = async(_id: string, payload: Partial<IApplication>) => {
    const result = await ApplicationModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteApplication = async(_id: string) => {
    const result = await ApplicationModel.findOneAndDelete({_id});
    return result;
}

export const applicationService = {
    createApplication,
    getAllApplications,
    getSingleApplication,
    updateApplication,
    deleteApplication,
}