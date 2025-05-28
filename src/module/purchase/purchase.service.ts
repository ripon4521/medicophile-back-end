import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import PurchaseTokenModel from "../purchaseToken/purchaseToken.model";
import { UserModel } from "../user/user.model";
import { IPurchase } from "./purchase.interface";
import { PurchaseModel } from "./purchase.model";
import mongoose, { ClientSession } from "mongoose";
import PaymentDetailsModel from "../paymentDetails/paymentDetails.model";
import QueryBuilder from "../../builder/querybuilder";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";
import { SalesModel } from "../accounts/sales.model";
import { ISales } from "../accounts/accounts.interface";

const createPurchase = async (payload: IPurchase, session?: ClientSession) => {
  if (!session) {
    throw new Error("Session is required");
  }

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

  // Update token status
  await PurchaseTokenModel.updateOne(
    { _id: payload.purchaseToken },
    { status: tokenStatus },
    { session },
  );

  let result = null;

  if (payload.paymentStatus === "Paid") {
    result = await PurchaseModel.create([payload], { session });

    if (!result || result.length === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create purchase");
    }

    // Create payment details
    const data = {
      purchaseId: result[0]._id,
      studentId: result[0].studentId,
      paidAmount: result[0].totalAmount,
      paymentInfo: result[0].paymentInfo,
    };
    await PaymentDetailsModel.create([data], { session });

    // Create sales record
    const salesPayload: ISales = {
      source: "sales",
      purchaseId: result[0]._id,
      customerId: result[0].studentId,
      amount: result[0].totalAmount,
    };
    await SalesModel.create([salesPayload], { session });
  }

  return result ? result[0] : null;
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
