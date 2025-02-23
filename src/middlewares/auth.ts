import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('You are not authorized!');
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'

    const decoded = jwt.verify(token, "primarytestkey") as JwtPayload;
    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('This user is not found!');
    }

    if (user.isBlocked) {
      throw new Error('This user is blocked!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }

    req.user = decoded; // Attach decoded token to req.user
    next();
  });
};

export default auth;
