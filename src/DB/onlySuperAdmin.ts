import { Request, Response, NextFunction } from "express";
import AppError from "../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { USER_ROLE } from "../module/user/user.constants";

export const onlySuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user || user.role !== USER_ROLE.admin) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Only Super Admin can access this route.",
    );
  }

  next();
};
