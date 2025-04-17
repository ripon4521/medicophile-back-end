import jwt, { JwtPayload } from 'jsonwebtoken';
 // Assuming this is your custom error handler
import { StatusCodes } from 'http-status-codes';
import AppError from '../helpers/AppError';
import { NextFunction, Request, Response } from 'express';
import config from '../config';

const verifyAccessToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
  if (!token) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Access token missing"));
  }

  jwt.verify(token, config.accessSecret as string, (err, decoded) => {
    if (err) {
      return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired access token"));
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
