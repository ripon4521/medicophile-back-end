import QRCode from "qrcode";
import { PurchaseModel } from "../purchase/purchase.model";
import qrCodeModel from "./qrCodeGenerate.model";
import { BatchStudentModel } from "../batchStudent/batchStudent.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/querybuilder";

const generateQrCodeForStudent = async (studentId: string) => {
  const student = await PurchaseModel.findOne({ studentId });
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, "Student not found in purchase");
  }

  const batchStudent = await BatchStudentModel.findOne({ studentId });
  if (!batchStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, "Student not admitted in batch");
  }

  const qrData = student._id.toString();
  const qrImage = await QRCode.toDataURL(qrData);

  const result = await qrCodeModel.create({ qrCode: qrImage });

  return result;
};

const getQrCode = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(qrCodeModel, query)
    .search(["qrCode"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "_id",
        select: "name role phone profile_picture",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const deleteQrCode = async (_id: string) => {
  const result = await qrCodeModel.findOneAndDelete({ _id });
  return result;
};

const getSingleQrCode = async (_id: string) => {
  const result = await qrCodeModel.findOne({ _id });
  return result;
};

export const qrCodeService = {
  generateQrCodeForStudent,
  getQrCode,
  deleteQrCode,
  getSingleQrCode,
};
