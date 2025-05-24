import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { getDeviceInfo } from "../../middlewares/getDeviceInfo";
import AppError from "../../helpers/AppError";
import config from "../../config";
import jwt from "jsonwebtoken";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const meta = getDeviceInfo(req);
  const result = await AuthService.login(req.body, meta);

  const { accessToken, refreshToken, user } = result;

  // Set refresh token in HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.nodeEnv === "development",
    httpOnly: true, // JS access off
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Send access token and user data
  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "Login successful",
    data: {
      accessToken: accessToken || "",
      user: user || {},
    },
  });
});

const adminlogin = catchAsync(async (req: Request, res: Response) => {
  const meta = getDeviceInfo(req);
  const result = await AuthService.adminlogin(req.body, meta);

  const { accessToken, refreshToken, user } = result;

  // Set refresh token in HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.nodeEnv === "development",
    httpOnly: true, // JS access off
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Send access token and user data
  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "Login successful",
    data: {
      accessToken: accessToken || "",
      user: user || {},
    },
  });
});



const logout = catchAsync(async (req: Request, res: Response) => {
  const meta = getDeviceInfo(req);
  const payload = req.body;
  const result = await AuthService.logout(payload, meta);
  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "Logout successful",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  let { phone } = req.body;

  // Handle if phone is nested (defensive coding)
  if (typeof phone === "object" && phone?.phone) {
    phone = phone.phone;
  }

  if (typeof phone !== "string") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid phone number format.");
  }

  console.log("Received phone:", phone);

  const result = await AuthService.resetPassword(phone);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "Password Reset Successful",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Refresh token is missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.refreshSecret as string) as {
      phone: string;
      role: string;
      _id: string;
    };

    const newAccessToken = jwt.sign(
      {
        phone: decoded.phone,
        role: decoded.role,
        _id: decoded._id,
      },
      config.accessSecret as string,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      success: true,
      message: "New access token generated successfully.",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Invalid or expired refresh token.",
    );
  }
});

export const AuthControllers = {
  register,
  login,
  logout,
  resetPassword,
  refreshToken,
  adminlogin
};
