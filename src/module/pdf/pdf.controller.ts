import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";
import { uploadPdfService } from "./pdf.service";
import catchAsync from "../../utils/catchAsync";

export const uploadPdf = catchAsync(async (req: any, res: any) => {
  const file = req.file;

  if (!file) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "No PDF file uploaded" });
  }

  const result = await uploadPdfService(file);

  res.status(httpStatus.OK).json({
    success: true,
    message: "PDF uploaded successfully",
    data: result,
  });
});
