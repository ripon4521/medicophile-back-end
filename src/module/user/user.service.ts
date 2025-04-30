import mongoose from "mongoose";
import { UserModel } from "./user.model";
import { IUser } from "./user.interface";
// import StudentUserModel from "../student/student.model";
import FacultyUserModel from "../teacher/faculty.model";
// import { IStudent } from "../student/student.interface";
import { IFaculty } from "../teacher/faculty.interface";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { IStudent } from "../student/student.interface";
import studentModel from "../student/student.model";
import { IAdmin } from "../admin/admin.interface";
import adminModel from "../admin/admin.model";
import bcrypt from "bcrypt";
import { sendSMS } from "../../utils/sendSms";
import { IChangePasswordPayload } from "./changepassord.interface";
import httpStatus from "http-status";

const createStudentsIntoDB = async (payload: IStudent) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create student first (without userId)
    const studentData = { ...payload };
    const plainPassword = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const sms = await sendSMS(
      payload.phone,
      `Your login password is: ${plainPassword}`,
    );
    if (!sms) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Student Create Failed.");
    }

    // console.log(sms)

    const createdStudent = await studentModel.create([studentData], {
      session,
    });

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Step 4: Create user using data from createdStudent
    const userData: Partial<IUser> = {
      name: createdStudent[0].name,
      status: createdStudent[0].status,
      role: createdStudent[0].role,
      profile_picture: createdStudent[0].profile_picture,
      phone: createdStudent[0].phone,
      password: hashedPassword,
      email: createdStudent[0].email,
      isDeleted: createdStudent[0].isDeleted,
      deletedAt: createdStudent[0].deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });

    // Step 5: Update student with userId
    await studentModel.updateOne(
      { _id: createdStudent[0]._id },
      { userId: newUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return {
      student: createdStudent[0],
      user: newUser[0],
      password: plainPassword, // send this if needed (for SMS/email)
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};

const createAdmiIntoDB = async (payload: IAdmin) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Create admin first (without userId)
    const plainPassword = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const adminData = { ...payload };

    const sms = await sendSMS(
      payload.phone,
      `Your login password is: ${plainPassword}`,
    );
    if (!sms) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Student Create Failed.");
    }

    const createdAdmin = await adminModel.create([adminData], { session });

    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    // Step 2: Now create the user using createdAdmin data
    const userData: Partial<IUser> = {
      name: createdAdmin[0]?.name,
      status: createdAdmin[0]?.status,
      role: createdAdmin[0]?.role,
      profile_picture: createdAdmin[0]?.profile_picture,
      phone: createdAdmin[0]?.phone,
      password: hashedPassword,
      email: createdAdmin[0]?.email,
      isDeleted: createdAdmin[0]?.isDeleted,
      deletedAt: createdAdmin[0]?.deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });

    // Step 3: Update admin with the newly created userId
    await adminModel.updateOne(
      { _id: createdAdmin[0]._id },
      { userId: newUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    return { admin: createdAdmin[0], user: newUser[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};

const createFacultysIntoDB = async (payload: IFaculty) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Create admin first (without userId)
    const faculty = { ...payload };
    const plainPassword = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const sms = await sendSMS(
      payload.phone,
      `Your login password is: ${plainPassword}`,
    );
    if (!sms) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Student Create Failed.");
    }

    const createdFaculty = await FacultyUserModel.create([faculty], {
      session,
    });

    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    // Step 2: Now create the user using createdAdmin data
    const userData: Partial<IUser> = {
      name: createdFaculty[0]?.name,
      status: createdFaculty[0]?.status,
      role: createdFaculty[0]?.role,
      profile_picture: createdFaculty[0]?.profile_picture,
      phone: createdFaculty[0]?.phone,
      password: hashedPassword,
      email: createdFaculty[0]?.email,
      isDeleted: createdFaculty[0]?.isDeleted,
      deletedAt: createdFaculty[0]?.deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });

    // Step 3: Update admin with the newly created userId
    await FacultyUserModel.updateOne(
      { _id: createdFaculty[0]._id },
      { userId: newUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    return { admin: createdFaculty[0], user: newUser[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};

const changePassword = async (
  payload: IChangePasswordPayload,
): Promise<string> => {
  const { phone, oldPassword, newPassword, confirmPassword } = payload;

  const user = await UserModel.findOne({ phone });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found with this phone number",
    );
  }

  // Check if old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password and confirm password do not match",
    );
  }

  // Hash and update new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();

  return "Password changed successfully";
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
  createStudentsIntoDB,
  getUSers,
  deleteUser,
  getPofile,
  createAdmiIntoDB,
  changePassword,
};
