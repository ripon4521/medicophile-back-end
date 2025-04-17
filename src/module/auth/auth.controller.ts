import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { getDeviceInfo } from "../../middlewares/getDeviceInfo";
import AppError from "../../helpers/AppError";

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

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    status: true,
    message: "Login successful",
    data: {
      token: result?.token || "",
      user: result?.user || {},
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
  if (typeof phone === 'object' && phone?.phone) {
    phone = phone.phone;
  }

  if (typeof phone !== 'string') {
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


export const AuthControllers = {
  register,
  login,
  logout,
  resetPassword,
};
