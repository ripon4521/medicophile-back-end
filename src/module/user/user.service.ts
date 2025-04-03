import mongoose from "mongoose";
import { UserModel } from "./user.model";
import { IUser } from "./user.interface";
// import StudentUserModel from "../student/student.model";
import FacultyUserModel from "../teacher/faculty.model";
// import { IStudent } from "../student/student.interface";
import { IFaculty } from "../teacher/faculty.interface";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

// const createStudentsIntoDB = async (payload: IStudent) => {
//   const userData: Partial<IUser> = {};
//   userData.name = payload.full_name;
//   userData.status = payload.status;
//   userData.role = payload.role;
//   userData.profile_picture = payload.profile_picture;
//   userData.address = payload.contact_info.home_address;
//   userData.district = payload.contact_info.district;
//   userData.division = payload.contact_info.division;
//   userData.contact = payload.contact_info.student_phone;
//   userData.password = payload.password
//   userData.gmail = payload.gmail;
//   userData.gender = payload.gender;
//   userData.date_of_birth = payload.date_of_birth;
//   userData.religion=payload.religion

//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const newUser = await UserModel.create([userData], { session });
//     payload.userId = newUser[0]._id;
//     const student = await StudentUserModel.create([payload], { session });
//     await session.commitTransaction();
//     session.endSession();
//     return { student: student[0] };
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw new Error("Transaction failed: " + error);
//   }
// };

// const createAdminIntoDB = async (payload: ) => {
//   const userData: Partial<IUser> = {};
//   userData.name = payload.name;
//   userData.status = payload.status;
//   userData.role = 'admin';
//   userData.address = payload.address;
//   userData.contact = payload.contact;
//   userData.password = payload.password
//   userData.gmail = payload.gmail;
//   const newUser = await UserModel.create(userData);
//   return newUser;

// };

const createFacultysIntoDB = async (payload: IFaculty) => {
  const userData: Partial<IUser> = {};
  userData.name = payload.name;
  userData.status = payload.status;
  userData.role = payload.role;
  userData.profile_picture = payload.profile_picture;
  userData.phone = payload.phone;
  userData.password = payload.password;
  userData.email = payload.email;
  userData.isDeleted = payload.isDeleted;
  userData.deletedAt = payload.deletedAt;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUser = await UserModel.create([userData], { session });
    payload.userId = newUser[0]._id;
    const faculty = await FacultyUserModel.create([payload], { session });
    await session.commitTransaction();
    session.endSession();
    return { faculty: faculty[0] };
  } catch (error) {
    console.log("error", error);
    await session.abortTransaction();
    session.endSession();
    new Error("Transaction failed: " + error);
  }
};

const getUSers = async () => {
  const users = await UserModel.find();
  return users;
};

const deleteUser = async () => {
  const result = await UserModel.deleteMany();
  return result;
};

const getPofile = async (phone: string) => {
  if (!phone)
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "phone number is required to fetch profile.",
    );

  const result = await UserModel.findOne({ phone });
  if (!result) throw new AppError(StatusCodes.FORBIDDEN, "User not found.");

  return result;
};

export const userService = {
  createFacultysIntoDB,

  getUSers,
  deleteUser,
  getPofile,
};
