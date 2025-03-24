/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { handleCastError } from "../helpers/handleCastError"
import { handlerDuplicateError } from "../helpers/handleDuplicateError"
import { handleGenericError } from "../helpers/handleGenericError"
import { handleValidationError } from "../helpers/handlerValidationError"
import { handlerZodError } from "../helpers/handleZodError"
import { CustomError } from "../helpers/handleCustomError"
import AppError from "../helpers/AppError"
import { StatusCodes } from "http-status-codes"
import { TErrorMessages } from "./error.interface"
// import { handlerZodError } from "../helpers/handleZodError";

type TErrorResponse = {
    success: boolean
    message: string
    error: any
}


let statusCode = StatusCodes.INTERNAL_SERVER_ERROR as number;
let message = 'Something went wrong';

let errorMessages: TErrorMessages = [
    {
        path: '',
        message: 'Something went wrong',
    },
];

export const globalErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {

    let response: {
        success: boolean;
        message: string;
        statusCode: number;
        error: any;
        stack?: string;
      } = {
        success: false,
        message: "An unexpected error occurred",
        statusCode: 500,
        error: null,
      };
    
      if (err instanceof CustomError) {
        response = {
          success: false,
          message: err.message,
          statusCode: err.statusCode,
          error: err.details || null,
          stack: err.stack, 
        };
        res.status(err.statusCode).json(response);
      }
      else if (err.name && err.name === "ZodError") {
        handlerZodError(err, res);
      }
    else if (err instanceof mongoose.Error.CastError) {
        handleCastError(err, res)
    }
    else if (err instanceof mongoose.Error.ValidationError) {
        handleValidationError(err, res)
    }
    else if (err.code && err.code === 11000) {
        handlerDuplicateError(err, res)
    }
    else if (err instanceof Error) {
        handleGenericError(err, res)
    }
    else if (err instanceof AppError) {
      statusCode = err?.statusCode;
      message = err?.message;
      errorMessages = [
          {
              path: '',
              message: err?.message,
          },
      ];
  } 
}



