import { IStudentUser } from "./student.interface";
import StudentUserModel from "./student.model";


const getAllStudents = async () => {
    const result = await StudentUserModel.find().populate('user');
    return result;
    
}

const getStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOne({_id});
    return result;
}

const updateStudentById = async (_id: string, payload: Partial<IStudentUser>) => {
    const result = await StudentUserModel.findOneAndUpdate({_id}, payload, {new: true});
    return result;
}

const deleteStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOneAndDelete({_id});
    return result;
}

export const studentsService = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
 
}