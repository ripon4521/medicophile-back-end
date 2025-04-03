import { CustomError } from "../../helpers/handleCustomError";
import { IUser } from "../user/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const register = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  if (!result) {
    throw new CustomError("Failed to create user", 500);
  }
  return result;
};

const login = async (payload: { phone: string; password: string }) => {
  if (!payload.phone || !payload.password) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Gmail and password are required",
    );
  }

  const user = await UserModel.findOne({ phone: payload.phone }).select(
    "+password",
  );

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

  const jwtPayload = {
    phone: user.phone,
    role: user.role,
    _id: user._id.toString(),
  };

  const token = jwt.sign(
    jwtPayload,
    process.env.JWT_SECRET || "primarytestkey",
    { expiresIn: "100d" },
  );

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
