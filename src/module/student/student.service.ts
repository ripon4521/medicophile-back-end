import mongoose, { startSession } from "mongoose";
import { UserModel } from "../user/user.model";
import StudentUserModel from "./student.model";
import { IUser } from "../user/user.interface";
import { IStudent } from "./student.interface";


const getAllStudents = async () => {
    const result = await StudentUserModel.find().populate('user');
    return result;
    
}

const getStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOne({user: _id});
    return result;
}


  const deleteStudentById = async (_id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Student ke find kore check kora
        const student = await StudentUserModel.findOne({ _id }).session(session);
        if (!student) {
            throw new Error("Student not found");
        }

        // Student er associated user er _id niye delete korbo
        const userId = student.userId;
        
        // StudentUserModel theke delete
        await StudentUserModel.findOneAndDelete({ _id }).session(session);

        // UserModel theke user delete
        if (userId) {
            await UserModel.findOneAndDelete({ _id: userId }).session(session);
        }

        // Transaction commit
        await session.commitTransaction();
        session.endSession();

        return { message: "Student and associated user deleted successfully"   };
    } catch (error) {
        // Rollback transaction if error occurs
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};





export const studentsService = {
    getAllStudents,
    getStudentById,
    deleteStudentById,
 
}