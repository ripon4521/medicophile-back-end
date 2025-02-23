import QueryBuilder from "../../builder/querybuilder";
import { searchableFields } from "./job.constant";
import { IJob } from "./job.interface";
import { JobModel } from "./job.model";



const createJob = async ( payload: IJob) =>{
    const result = await JobModel.create(payload);
    return result;
}

const getAllJob = async (query: Record<string, unknown>) => {
    const jobQuery = new QueryBuilder(
        JobModel.find()
          , query,
      )
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
    const result = await jobQuery.modelQuery;
    return result;
}


const getSingleJob = async (_id:string) => {
    const result = await JobModel.findOne({_id});
    return result;
}


const updateJob = async (_id: string, payload: IJob) => {
    const result = await JobModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}


const deleteJob = async (_id: string) => {
    const result = await JobModel.findOneAndDelete({_id});
    return result;
}





export const jobService = {
    createJob,
    getAllJob,
    getSingleJob,
    updateJob,
    deleteJob,
}
