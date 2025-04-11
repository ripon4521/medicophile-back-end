import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import { uploadImageService } from "./imageUpload.service";

export const uploadImage = catchAsync(async (req: any, res: any) => {
  const file = req.file;
  if (!file) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "No file uploaded" });
  }

  const result = await uploadImageService(file);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Image uploaded successfully",
    data: result,
  });
});
