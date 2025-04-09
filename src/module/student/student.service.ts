import mongoose, { startSession } from "mongoose";
import { UserModel } from "../user/user.model";

import { IUser } from "../user/user.interface";
import { IStudent } from "./student.interface";
import studentModel from "./student.model";

const getAllStudents = async () => {
  const result = await studentModel
    .find({ isDeleted: false })
    .populate("userId");
  return result;
};

const getStudentById = async (_id: string) => {
  const result = await studentModel.findOne({ _id }).populate("userId");
  return result;
};

const deleteStudentById = async (_id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Student ke find kore check kora
    const student = await studentModel.findOne({ _id }).session(session);
    if (!student) {
      throw new Error("Student not found");
    }

    // Student er associated user er _id niye delete korbo
    const userId = student.userId;

    // StudentUserModel theke delete
    await studentModel
      .findOneAndUpdate(
        { _id },
        {
          isDeleted: true,
          deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        },
        { new: true },
      )
      .session(session);

    // UserModel theke user delete
    if (userId) {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          isDeleted: true,
          deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        },
        { new: true },
      ).session(session);
    }

    // Transaction commit
    await session.commitTransaction();
    session.endSession();

    return { message: "Student and associated user deleted successfully" };
  } catch (error) {
    // Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateStudent = async (_id: string, updateData: Partial<IStudent>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await studentModel.findById(_id).session(session);
    if (!student) {
      throw new Error("Student not found");
    }

    // Update Student model
    const updatedStudent = await studentModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true, session },
    );

    if (!updatedStudent) {
      throw new Error("Failed to update student");
    }

    const userUpdateData: Partial<IUser> = {};

    const updateStudentData = await studentModel.findById(_id).session(session);
    userUpdateData.email = updateStudentData?.email;
    userUpdateData.role = updateStudentData?.role;
    userUpdateData.name = updateStudentData?.name;
    userUpdateData.phone = updateStudentData?.phone;
    userUpdateData.status = updateStudentData?.status;
    userUpdateData.profile_picture = updateStudentData?.profile_picture;
    userUpdateData.isDeleted = updateStudentData?.isDeleted;
    userUpdateData.deletedAt = updateStudentData?.deletedAt;

    // Update user model
    const updatedUser = await UserModel.findByIdAndUpdate(
      student.userId,
      userUpdateData,
      { new: true, runValidators: true, session },
    );

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    // Commit transaction if everything is fine
    await session.commitTransaction();
    session.endSession();

    return updatedStudent;
  } catch (error) {
    // Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();

    throw new Error("Error updating student and user");
  }
};

export const studentsService = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
};
