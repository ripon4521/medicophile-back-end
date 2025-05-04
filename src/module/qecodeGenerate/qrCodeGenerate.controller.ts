import { Request, Response } from "express";
import { qrCodeService } from "./qrCodeGenerate.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../helpers/AppError";

const generateQrCode = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.body;
  if (!studentId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Student ID Requierd");
  }

  const result = await qrCodeService.generateQrCodeForStudent(studentId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "  Qr Code Generate successfully",
    data: result,
  });
});

const getAllQrcode = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await qrCodeService.getQrCode(query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Qr Code get successfully",
    data: result,
  });
});

const deleteQrcode = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await qrCodeService.deleteQrCode(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Qr Code deleted successfully",
    data: result,
  });
});

const getSingleQrcode = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await qrCodeService.getSingleQrCode(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Qr Code get successfully",
    data: result,
  });
});

export const qrCodeController = {
  generateQrCode,
  getAllQrcode,
  deleteQrcode,
  getSingleQrcode,
};
