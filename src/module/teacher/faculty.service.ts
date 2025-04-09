import mongoose, { startSession } from "mongoose";
import { IUser } from "../user/user.interface";
import FacultyUserModel from "./faculty.model";
import { UserModel } from "../user/user.model";
import { IFaculty } from "./faculty.interface";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const getAllFacultys = async () => {
  const result = await FacultyUserModel.find({ isDeleted: false }).populate(
    "userId",
  );
  return result;
};

const getFacultyById = async (_id: string) => {
  const result = await FacultyUserModel.findOne({ _id }).populate("userId");
  return result;
};

const updateFaculty = async (_id: string, updateData: Partial<IFaculty>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const teacher = await FacultyUserModel.findOne({ _id }).session(session);
    if (!teacher) {
      throw new AppError(StatusCodes.FORBIDDEN, "Faculty not found");
    }

    // Other updates for faculty details...
    const updatedStudent = await FacultyUserModel.findOneAndUpdate(
      { _id },
      updateData,
      { new: true, runValidators: true, session },
    );

    if (!updatedStudent) {
      throw new Error("Failed to update faculty");
    }

    const userUpdateData: Partial<IUser> = {};
    const updateStudentData =
      await FacultyUserModel.findById(_id).session(session);
    console.log(updatedStudent);

    userUpdateData.email = updateStudentData?.email;
    userUpdateData.name = updateStudentData?.name;
    userUpdateData.phone = updateStudentData?.phone;
    userUpdateData.status = updateStudentData?.status;
    userUpdateData.deletedAt = updateStudentData?.deletedAt;
    userUpdateData.isDeleted = updateStudentData?.isDeleted;
    userUpdateData.profile_picture = updateStudentData?.profile_picture;

    // Update user model
    const updatedUser = await UserModel.findByIdAndUpdate(
      teacher.userId,
      userUpdateData,
      { new: true, runValidators: true, session },
    );

    if (!updatedUser) {
      throw new AppError(StatusCodes.FORBIDDEN, "Failed to update user");
    }

    // Commit transaction if everything is fine
    await session.commitTransaction();
    session.endSession();

    return updatedStudent;
  } catch (error) {
    // Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();

    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Error updating faculty and user",
    );
  }
};

const deleteFacultyById = async (_id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Faculty ke find kore check kora
    const faculty = await FacultyUserModel.findOne({ _id }).session(session);
    if (!faculty) {
      throw new Error("Faculty not found");
    }
    // Faculty er associated user er _id niye delete korbo
    const userId = faculty.userId;

    // FacultyUserModel theke delete
    await FacultyUserModel.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
    ).session(session);

    // UserModel theke user delete
    if (userId) {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          isDeleted: true,
          deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        },
      ).session(session);
    }

    // Transaction commit
    await session.commitTransaction();
    session.endSession();

    return { message: "Faculty and associated user deleted successfully" };
  } catch (error) {
    // Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const facultysService = {
  getAllFacultys,
  getFacultyById,
  deleteFacultyById,
  updateFaculty,
};
