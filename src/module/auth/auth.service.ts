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
import httpStatus from "http-status";
import axios from "axios";
import config from "../../config";
import adminModel from "../admin/admin.model";
import { sendSMS } from "../../utils/sendSms";

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
  },
) => {
  if (!payload.phone || !payload.password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Phone and password are required",
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
      user.password,
    );

    if (!isPasswordMatched) {
      throw new AppError(StatusCodes.FORBIDDEN, "Invalid password");
    }

    const student = await UserModel.findOne({ _id: user._id }).session(session);
    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    const existingCredential = await UserCredentialsModel.findOne({
      studentId: student._id,
      phone: payload.phone,
      isDeleted: false,
    }).session(session);

    const jwtPayload = {
      phone: user.phone,
      role: user.role,
      _id: user._id.toString(),
    };

    const accessToken = jwt.sign(jwtPayload, config.accessSecret as string, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      jwtPayload,

      config.refreshSecret as string,
      {
        expiresIn: "30d",
      },
    );

    if (
      existingCredential &&
      (existingCredential.ipAddress !== meta.ipAddress ||
        existingCredential.deviceType !== meta.deviceType ||
        existingCredential.deviceName !== meta.deviceName)
    ) {
      existingCredential.isDeleted = true;
      existingCredential.deletedAt = new Date(
        new Date().getTime() + 6 * 60 * 60 * 1000,
      );
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
          accessToken: accessToken,
          refreshToken: refreshToken,
          deletedAt: null,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return { accessToken, refreshToken, user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Logout function
const logout = async (
  payload: { phone: string },
  meta: { ipAddress: string; deviceType: string; deviceName: string },
) => {
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

const resetPassword = async (phone: string): Promise<string> => {
  const user = await UserModel.findOne({ phone: phone });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found with this phone number",
    );
  }

  // Generate random 6-digit password
  const newPassword = Math.floor(100000 + Math.random() * 900000).toString();

  const sms = await sendSMS(
    phone,
    `Your login password is: ${newPassword}`,
  );
  if (!sms) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password Reset Failed.");
  }
  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  await user.save();

  return "New password sent via SMS and updated successfully.";
};

export const AuthService = {
  register,
  login,
  logout,
  resetPassword,
};
