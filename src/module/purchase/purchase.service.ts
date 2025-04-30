import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import PurchaseTokenModel from "../purchaseToken/purchaseToken.model";
import { UserModel } from "../user/user.model";
import { IPurchase } from "./purchase.interface";
import { PurchaseModel } from "./purchase.model";
import mongoose from "mongoose";
import PaymentDetailsModel from "../paymentDetails/paymentDetails.model";
import { IPaymentDetails } from "../paymentDetails/paymentDetails.interface";
import QueryBuilder from "../../builder/querybuilder";

const createPurchase = async (payload: IPurchase) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const student = await UserModel.findOne({ _id: payload.studentId }).session(
      session,
    );
    const purchaseToken = await PurchaseTokenModel.findOne({
      _id: payload.purchaseToken,
    }).session(session);
    const issuedBy = await UserModel.findOne({ _id: payload.issuedBy }).session(
      session,
    );

    if (!student || student.role === "admin" || student.role === "teacher") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid student id. Only student can buy course",
      );
    }

    if (!purchaseToken) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid purchase token id.");
    }

    if (!issuedBy) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid issuedBy id.");
    }

    // Set values from token
    payload.charge = purchaseToken.charge;
    payload.discount = purchaseToken.discount;
    payload.totalAmount = purchaseToken.totalAmount;
    payload.subtotal = purchaseToken.subtotal;
    payload.courseId = purchaseToken.courseId;
    payload.paymentInfo = purchaseToken.paymentInfo;

    // Update status based on paymentStatus
    let tokenStatus = "";
    if (payload.paymentStatus === "Paid") {
      payload.status = "Active";
      tokenStatus = "Verified";
    } else if (payload.paymentStatus === "Pending") {
      payload.status = "Archive";
      tokenStatus = "Pending";
    } else if (payload.paymentStatus === "Refunded") {
      payload.status = "Course Out";
      tokenStatus = "Refunded";
    } else if (payload.paymentStatus === "Partial") {
      payload.status = "Archive";
      tokenStatus = "Partial";
    } else if (payload.paymentStatus === "Rejected") {
      payload.status = "Course Out";
      tokenStatus = "Rejected";
    }

    await PurchaseTokenModel.updateOne(
      { _id: payload.purchaseToken },
      { status: tokenStatus },
      { session },
    );

    let result = null;
    if (payload.paymentStatus === "Paid") {
      result = await PurchaseModel.create([payload], { session });
      // set value for payment details
      if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create result");
      }
      const data = {
        purchaseId: result[0]._id,
        studentId: result[0].studentId,
        paidAmount: result[0].totalAmount,
        paymentInfo: result[0].paymentInfo,
      };
      await PaymentDetailsModel.create([data], { session });
    }

    await session.commitTransaction();
    session.endSession();

    return result ? result[0] : null;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllPurchase = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(PurchaseModel, query)
    .search(["status"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "studentId",
      select: "name role phone",
    })
    .populate([
      {
        path: "courseId",
      },
    ]);
  const result = await courseQuery.exec();
  return result;
};

const deletePurchase = async (_id: string) => {
  const result = await PurchaseModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: false,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete purchase");
  }
  return result;
};

const updatePurchase = async (_id: string, payload: IPurchase) => {
  const result = await PurchaseModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  return result;
};

export const purchaseService = {
  createPurchase,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
};
