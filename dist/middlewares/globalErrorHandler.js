"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleCastError_1 = require("../helpers/handleCastError");
const handleDuplicateError_1 = require("../helpers/handleDuplicateError");
const handleGenericError_1 = require("../helpers/handleGenericError");
const handlerValidationError_1 = require("../helpers/handlerValidationError");
const handleZodError_1 = require("../helpers/handleZodError");
const handleCustomError_1 = require("../helpers/handleCustomError");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (err, req, res, _next) => {
  let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";
  let errorMessages = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  // CustomError (like Zod structured errors)
  if (err instanceof handleCustomError_1.CustomError) {
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
    return (0, handleZodError_1.handlerZodError)(err, res);
  }
  // Mongoose Cast Error
  if (err instanceof mongoose_1.default.Error.CastError) {
    return (0, handleCastError_1.handleCastError)(err, res);
  }
  // Mongoose Validation Error
  if (err instanceof mongoose_1.default.Error.ValidationError) {
    return (0, handlerValidationError_1.handleValidationError)(err, res);
  }
  // Duplicate key error (MongoDB error code: 11000)
  if (err.code && err.code === 11000) {
    return (0, handleDuplicateError_1.handlerDuplicateError)(err, res);
  }
  // Our custom AppError
  if (err instanceof AppError_1.default) {
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
    return (0, handleGenericError_1.handleGenericError)(err, res);
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
exports.globalErrorHandler = globalErrorHandler;
