/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { handleCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handleGenericError } from "../helpers/handleGenericError";
import { handleValidationError } from "../helpers/handlerValidationError";
import { handlerZodError } from "../helpers/handleZodError";
import { CustomError } from "../helpers/handleCustomError";
import AppError from "../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { TErrorMessages } from "./error.interface";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  let errorMessages: TErrorMessages = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // CustomError (like Zod structured errors)
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.details || errorMessages;

    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      error: errorMessages,
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    });
    return;
  }

  // Zod validation error
  if (err.name === "ZodError") {
    return handlerZodError(err, res);
  }

  // Mongoose Cast Error
  if (err instanceof mongoose.Error.CastError) {
    return handleCastError(err, res);
  }

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    return handleValidationError(err, res);
  }

  // Duplicate key error (MongoDB error code: 11000)
  if (err.code && err.code === 11000) {
    return handlerDuplicateError(err, res);
  }

  // Our custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];

    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      error: errorMessages,
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    });
    return;
  }

  // Generic error (unexpected)
  if (err instanceof Error) {
    return handleGenericError(err, res);
  }

  // Final fallback (just in case)
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorMessages,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
};
