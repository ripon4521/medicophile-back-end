import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../helpers/AppError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { UserModel } from "../module/user/user.model";

const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return next(
      new AppError(StatusCodes.UNAUTHORIZED, "Refresh token missing"),
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, config.refreshSecret as string);

    // Type assertion here
    const payload = decoded as JwtPayload; // Assert decoded as JwtPayload

    // Optionally: Check if refreshToken is valid by querying DB for session
    const user = await UserModel.findById(payload._id);
    if (!user) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token"),
      );
    }

    // Create a new access token
    const newAccessToken = jwt.sign(
      { phone: user.phone, role: user.role, _id: user._id.toString() },
      config.accessSecret as string,
      { expiresIn: "1h" },
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return next(
      new AppError(
        StatusCodes.UNAUTHORIZED,
        "Invalid or expired refresh token",
      ),
    );
  }
};
