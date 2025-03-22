import { IExam } from "./exam.interface";
import ExamModel from "./exam.model";


const createExam = async (payload:IExam) => {
    const result = await ExamModel.create(payload);
    return result;
}

const getAllExam = async ( ) => {
    const result = await ExamModel.find();
    return result;
}

const getSingleExam = async( _id : string) => {
    const result  = await ExamModel.findOne({_id});
    return result
}

const updateExam = async (_id: string, payload: Partial<IExam>) => {
    try {
      const update = await ExamModel.findOneAndUpdate({ _id }, payload, {
        new: true,
        runValidators: true,
      });
  
      if (!update) {
        throw new Error("Exam not found or update failed.");
      }
  
      return update;
    } catch (error) {
      console.error("Update Exam Error:", error);
      throw error;
    }
  };

const deleteExam = async (_id:string) => {
    const result = await ExamModel.findOneAndDelete({_id});
    return result;
}

export const examServices = {
    createExam,
    updateExam,
    deleteExam,
    getAllExam,
    getSingleExam
}