import { IModules } from "./modules.interface";
import ModuleModel from "./modules.model";

const createModule = async (payload: IModules) => {
  const result = await ModuleModel.create(payload);
  return result;
};

const getAllModule = async () => {
  const result = await ModuleModel.find()
    .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
    return result;
};
const getSingleModule = async ( _id : string) => {
    const result = await ModuleModel.findOne({_id}) .populate("createdBy")
    .populate({
      path: "courseId",
      populate: { path: "category" },
    });
    return result;
}

const updateModule = async (_id:string, payload:Partial<IModules>) => {
    const  update = await ModuleModel.findOneAndUpdate({_id}, payload, {
        new:true,
        runValidators:true
    });
    return update;
}

const deleteModule = async (_id:string) => {
    const result = await ModuleModel.findOneAndDelete({_id});
    return result;
}

export const moduleService = {
    createModule,
    deleteModule,
    updateModule,
    getAllModule,
    getSingleModule
    
}