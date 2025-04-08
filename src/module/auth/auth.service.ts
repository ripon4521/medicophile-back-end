import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import AppError from "../../helpers/AppError";
import { CustomError } from "../../helpers/handleCustomError";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import studentModel from "../student/student.model";
import { UserCredentialsModel } from "../userCredentials/userCredentials.model";

const register = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  if (!result) {
    throw new CustomError("Failed to create user", 500);
  }
  return result;
};

const login = async (
  payload: {
    phone: string;
    password: string;
  },
  meta: {
    ipAddress: string;
    deviceType: string;
    deviceName: string;
  }
) => {
  if (!payload.phone || !payload.password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Phone and password are required"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await UserModel.findOne({ phone: payload.phone })
      .select("+password")
      .session(session);

    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, "User not found!");
    }

    if (user.status === "Blocked") {
      throw new AppError(StatusCodes.UNAUTHORIZED, "This user is blocked!");
    }

    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new AppError(StatusCodes.FORBIDDEN, "Invalid password");
    }

    const student = await studentModel.findOne({ userId: user._id }).session(session);
    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, "Student not found");
    }

    const existingCredential = await UserCredentialsModel.findOne({
      studentId: student._id,
      phone: payload.phone,
      isDeleted: false,

    }).session(session);

   

    if ( existingCredential &&(
        existingCredential.ipAddress !== meta.ipAddress ||
        existingCredential.deviceType !== meta.deviceType ||
        existingCredential.deviceName !== meta.deviceName )
    ) {


      await UserCredentialsModel.findOneAndUpdate({ })
      existingCredential.isDeleted = true;
      existingCredential.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
      await existingCredential.save({ session });
    }
  
    await UserCredentialsModel.create(
      [
        {
          studentId: user._id,
          phone: user.phone,
          ipAddress: meta.ipAddress,
          deviceType: meta.deviceType,
          deviceName: meta.deviceName,
          isDeleted: false,
          deletedAt: null,
        },
      ],
      { session }
    );

    const jwtPayload = {
      phone: user.phone,
      role: user.role,
      _id: user._id.toString(),
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "primarytestkey", {
      expiresIn: "100d",
    });

    await session.commitTransaction();
    session.endSession();

    return { token, user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Logout function
const logout = async (payload: { phone: string }, meta: { ipAddress: string; deviceType: string; deviceName: string }) => {
  // Find the user credentials using phone and device info
  const existingCredential = await UserCredentialsModel.findOne({
    phone: payload.phone,
    ipAddress: meta.ipAddress,
    deviceType: meta.deviceType,
    deviceName: meta.deviceName,
    isDeleted: false,
  });

  if (!existingCredential) {
    throw new AppError(StatusCodes.NOT_FOUND, "Session not found!");
  }

  // Mark the current session as deleted
  existingCredential.isDeleted = true;
  existingCredential.deletedAt = new Date();
  
  // Save the updated credential status
  await existingCredential.save();

  return { message: "Logged out successfully" };
};

export const AuthService = {
  register,
  login,
  logout
};
