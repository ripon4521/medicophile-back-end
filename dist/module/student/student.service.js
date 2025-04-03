"use strict";
// import mongoose, { startSession } from "mongoose";
// import { UserModel } from "../user/user.model";
// import StudentUserModel from "./student.model";
// import { IUser } from "../user/user.interface";
// import { IStudent } from "./student.interface";
// const getAllStudents = async () => {
//   const result = await StudentUserModel.find().populate("userId");
//   return result;
// };
// const getStudentById = async (_id: string) => {
//   const result = await StudentUserModel.findOne({ _id }).populate("userId");
//   return result;
// };
// const deleteStudentById = async (_id: string) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     // Student ke find kore check kora
//     const student = await StudentUserModel.findOne({ _id }).session(session);
//     if (!student) {
//       throw new Error("Student not found");
//     }
//     // Student er associated user er _id niye delete korbo
//     const userId = student.userId;
//     // StudentUserModel theke delete
//     await StudentUserModel.findOneAndDelete({ _id }).session(session);
//     // UserModel theke user delete
//     if (userId) {
//       await UserModel.findOneAndDelete({ _id: userId }).session(session);
//     }
//     // Transaction commit
//     await session.commitTransaction();
//     session.endSession();
//     return { message: "Student and associated user deleted successfully" };
//   } catch (error) {
//     // Rollback transaction if error occurs
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };
// const updateStudent = async (_id: string, updateData: Partial<IStudent>) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const student = await StudentUserModel.findById(_id).session(session);
//     if (!student) {
//       throw new Error("Student not found");
//     }
//     // Update Student model
//     const updatedStudent = await StudentUserModel.findByIdAndUpdate(
//       _id,
//       updateData,
//       { new: true, runValidators: true, session },
//     );
//     if (!updatedStudent) {
//       throw new Error("Failed to update student");
//     }
//     const userUpdateData: Partial<IUser> = {};
//     const updateStudentData =
//       await StudentUserModel.findById(_id).session(session);
//     console.log(updateStudentData);
//     userUpdateData.gmail = updateStudentData?.gmail;
//     userUpdateData.address = updateStudentData?.contact_info.home_address;
//     userUpdateData.gender = updateStudentData?.gender;
//     userUpdateData.name = updateStudentData?.full_name;
//     userUpdateData.contact = updateStudentData?.contact_info.student_phone;
//     userUpdateData.district = updateStudentData?.contact_info.district;
//     userUpdateData.division = updateStudentData?.contact_info.division;
//     userUpdateData.date_of_birth = updateStudentData?.date_of_birth;
//     userUpdateData.religion = updateStudentData?.religion;
//     userUpdateData.status = updateStudentData?.status;
//     userUpdateData.profile_picture = updateStudentData?.profile_picture;
//     // Update user model
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       student.userId,
//       userUpdateData,
//       { new: true, runValidators: true, session },
//     );
//     if (!updatedUser) {
//       throw new Error("Failed to update user");
//     }
//     // Commit transaction if everything is fine
//     await session.commitTransaction();
//     session.endSession();
//     return updatedStudent;
//   } catch (error) {
//     // Rollback transaction if error occurs
//     await session.abortTransaction();
//     session.endSession();
//     throw new Error("Error updating student and user");
//   }
// };
// export const studentsService = {
//   getAllStudents,
//   getStudentById,
//   deleteStudentById,
//   updateStudent,
// };
