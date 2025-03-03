import mongoose from 'mongoose';
import { IStudentUser } from '../student/student.interface'
import { UserModel } from './user.model';
import { IUser } from './user.interface';
import StudentUserModel from '../student/student.model';


const createStudentsIntoDB = async (payload: IStudentUser) => {
  const userData: Partial<IUser> = {};

  userData.name = payload.name; 
  userData.status = payload.status; 
  userData.role = 'student'; 
  userData.address = payload.address; 
  userData.contact = payload.contact; 
  userData.password = payload.password 
  userData.gmail = payload.gmail;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
 

    const newUser = await UserModel.create([userData], { session });


    payload.user = newUser[0]._id;
    const student = await StudentUserModel.create([payload], { session });


    await session.commitTransaction();


    session.endSession();

 
    return { student: student[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};


const getUSers = async () => {
  const users = await UserModel.find();
  return users;
}

const deleteUser = async() => {
  const result = await UserModel.deleteMany();
  return result;
}







export const userService = {
createStudentsIntoDB,
  getUSers,
  deleteUser,

}
