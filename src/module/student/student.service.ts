import { startSession } from "mongoose";
import { UserModel } from "../user/user.model";
import { IStudentUser } from "./student.interface";
import StudentUserModel from "./student.model";
import { IUser } from "../user/user.interface";


const getAllStudents = async () => {
    const result = await StudentUserModel.find().populate('user');
    return result;
    
}

const getStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOne({_id});
    return result;
}


const updateStudentFromDb = async (_id: string, payload: Partial<IStudentUser>) => {
    const session = await startSession();
    session.startTransaction();
  
    try {
      const { preferences, academic_info, emergency_contact, user, ...remainingStudentData } = payload;
      const modifiedUpdateData: Record<string, unknown> = { ...remainingStudentData };
  
      // Dynamically update preferences
      if (preferences) {
        for (const [key, value] of Object.entries(preferences)) {
          modifiedUpdateData[`preferences.${key}`] = value;
        }
      }
  
      // Dynamically update academic info
      if (academic_info) {
        for (const [key, value] of Object.entries(academic_info)) {
          modifiedUpdateData[`academic_info.${key}`] = value;
        }
      }
  
      // Update student document with modified data
      const updatedStudent = await StudentUserModel.findByIdAndUpdate(
        _id, 
        modifiedUpdateData, 
        {
          new: true,
          runValidators: true,
          session,
        }
      );
  
      if (!updatedStudent) {
        throw new Error("Student not found");
      }
  
      // Emergency contact update
      if (emergency_contact) {
        await StudentUserModel.findByIdAndUpdate(
          _id, 
          { $set: { emergency_contact } }, 
          { session }
        );
      }
  
      // User data update, if any user fields are present
      const userFields = [
        "name", "gmail", "password", "contact", "address", "role", 
        "profile_picture", "registration_date", "last_login", "status"
      ];
  
      const userUpdateData: Partial<IUser> = {};
      for (const field of userFields) {
        const value = payload[field as keyof IUser];
        if (value !== undefined) {
          userUpdateData[field as keyof IUser] = value as any;
        }
      }
  
      if (Object.keys(userUpdateData).length > 0) {
        const userId = updatedStudent.user;
        await UserModel.findByIdAndUpdate(userId, userUpdateData, {
          new: true,
          runValidators: true,
          session,
        });
      }
  
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
  
      return updatedStudent;
  
    } catch (error) {
      // Abort the transaction if anything fails
      await session.abortTransaction();
      session.endSession();
      throw new Error(`Transaction failed: ${error.message}`);
    }
  };
  
  

const deleteStudentById = async (_id: string) => {
    const result = await StudentUserModel.findOneAndDelete({_id});
    return result;
}

export const studentsService = {
    getAllStudents,
    getStudentById,
updateStudentFromDb,
    deleteStudentById,
 
}