import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../module/user/user.interface";
import { UserModel } from "../module/user/user.model";
import { USER_ROLE, USER_STATUS } from "../module/user/user.constants";
import AppError from "../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { UserCredentialsModel } from "../module/userCredentials/userCredentials.model";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authUser = (...requiredRoles: TUserRole[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.user = null;
        return next();
      }

      const accessToken = authHeader.split(" ")[1];
      let decoded: any;

      try {
        decoded = jwt.verify(accessToken, config.accessSecret as string);
      } catch (err) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "Invalid or expired token.",
        );
      }

      const { role, phone, _id } = decoded;

      // 🔐 Check if session is valid in UserCredentialsModel
      const session = await UserCredentialsModel.findOne({
        studentId: _id,
        accessToken,
        isDeleted: false,
      });

      if (!session) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          "Your session is invalid or expired. Please log in again."
        );
      }

      const user = await UserModel.findOne({ phone });

      if (!user) {
        throw new AppError(StatusCodes.FORBIDDEN, "User not found.");
      }

      if (user.status === "Blocked") {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked.");
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "You are not authorized to access this resource.",
        );
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const onlyAdmin = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user || !user.role) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Access denied. You are not authorized!",
        );
      }
      if (user.role !== USER_ROLE.admin) {
        throw new AppError(StatusCodes.FORBIDDEN, "Access denied only admin");
      }
      if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized!");
      }
      next();
    },
  );
};


export const onlyAdminAndFacultyAndStudent = (...allowedRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;

      if (!user || !user.role) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Access denied. You are not authorized!",
        );
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          "Access denied. You are not authorized!",
        );
      }

      next();
    },
  );
};


 export const onlyStudent = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user || !user.role) {
        throw new Error("Access denied. You are not authorized!");
      }
      if (user.role !== USER_ROLE.student) {
        throw new Error("Access denied only student");
      }
      if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
        throw new Error("You are not authorized!");
      }
      next();
    },
  );
};

 export const onlyFaculty = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user || !user.role) {
        throw new Error("Access denied. No token provided or invalid format.");
      }
      if (user.role !== USER_ROLE.teacher) {
        throw new Error("Access denied only faculty");
      }
      if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
        throw new Error("You are not authorized!");
      }
      next();
    },
  );
};

export const auth = { authUser, onlyAdmin, onlyFaculty };
