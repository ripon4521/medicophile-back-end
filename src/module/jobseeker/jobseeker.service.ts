import { IJobSeeker } from "./jobseeker.interface";
import { JobSeekerModel } from "./jobseeker.model";


const createJobSeeker = async (payload:IJobSeeker) => {
    const result = await JobSeekerModel.create(payload);
    return result;
}

const getJobSeeker = async () => {
    const result = await JobSeekerModel.find().populate('user');
    return result;
}
const getSingleJobSeeker = async(_id:string) =>{
    const result = await JobSeekerModel.findOne({_id}).populate('user');
    return result;
}

const updateJobSeeker = async (_id: string, payload: Partial<IJobSeeker>) => {
    const result = await JobSeekerModel.findOneAndUpdate({_id}, payload, { new: true });
    return result;
}

const deleteJobSeeker = async (_id: string) => {
    const result = await JobSeekerModel.findOneAndDelete({_id});
    return result;
}

export const jobSeekerService = {
    createJobSeeker,
    getJobSeeker,
    getSingleJobSeeker,
    updateJobSeeker,
    deleteJobSeeker
 };
