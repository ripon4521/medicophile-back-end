import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { UserModel } from "../user/user.model";
import { IPurchaseToken } from "./purchaseToken.interface";
import PurchaseTokenModel from "./purchaseToken.model";
import CouponModel from "../coupon/coupon.model";
import QueryBuilder from "../../builder/querybuilder";
import courseModel from "../course/course.model";
import ReferDetails from "../referDetails/referDetails.model";
import { createStudentWithUser } from "../../utils/createStudentForPurchase";
import { IStudent } from "../student/student.interface";
import { IPurchase } from "../purchase/purchase.interface";
import { purchaseService } from "../purchase/purchase.service";
import mongoose from "mongoose";



const createPurchaseToken = async (payload: IPurchaseToken) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // StudentId না থাকলে check করবো phone দিয়ে user খুঁজে পাওয়া যায় কিনা
    if (!payload.studentId) {
      if (payload.phone) {
        const user = await UserModel.findOne({ phone: payload.phone }).session(session);
        if (user) {
          payload.studentId = user._id;
        }
      }

      // user না পাওয়া গেলে নতুন student তৈরি করবো
      if (!payload.studentId) {
        const studentPayload: IStudent = {
          name: payload.name,
          phone: payload.phone,
          email: '',
          role: 'student',
          profile_picture: '',
          userId: undefined,
          status: 'Active',
          isDeleted: false,
          password: '',
          gurdianName: '',
          gurdianPhone: '',
          address: '',
        };

        const { user } = await createStudentWithUser(studentPayload);
        if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'Student creation failed');
        payload.studentId = user._id;
      }
    }

    // Student ও Course validation
    const student = await UserModel.findOne({ _id: payload.studentId }).session(session);
    if (!student) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid student id');
    }

    const course = await courseModel.findOne({ _id: payload.courseId, isDeleted: false }).session(session);
    if (!course) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid course id');
    }

    // Purchase Token create
    const result = await PurchaseTokenModel.create([payload], { session });
    if (!result || result.length === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create purchase token');
    }

    const purchaseToken = result[0];

    // Refer logic
    if (payload.ref) {
      await ReferDetails.create([{
        referrerId: payload.ref,
        referredUserId: payload.studentId,
        courseId: payload.courseId,
        purchaseTokenId: purchaseToken._id,
      }], { session });
    }

    // Purchase create
    const purchasePayload: IPurchase = {
      charge: purchaseToken.charge,
      discount: purchaseToken.discount,
      totalAmount: purchaseToken.totalAmount,
      subtotal: purchaseToken.subtotal,
      courseId: purchaseToken.courseId,
      studentId: purchaseToken.studentId,
      purchaseToken: purchaseToken._id,
      paymentInfo: purchaseToken.paymentInfo,
      paymentStatus: "Paid",
      status: "Active",
      isExpire: false,
    };

    const purchaseResult = await purchaseService.createPurchase(purchasePayload, session);
    if (!purchaseResult) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create purchase');
    }

    await session.commitTransaction();
    session.endSession();

    return purchaseToken;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('❌ Error creating purchase token:', error);
    throw error;
  }
};




 






const getAllPurchasseToken = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(PurchaseTokenModel, query)
    .search([""])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "courseId",
        select:
          "cover_photo course_title description duration price offerPrice",
        populate: { path: "category", select: "title cover_photo" },
      },
    ])
    .populate([
      {
        path: "studentId",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get purchase token");
  }
  return result;
};

const updatePurchaseToken = async (_id: string, payload: IPurchaseToken) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await PurchaseTokenModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update purchase token",
    );
  }
  return result;
};

const deletePurchaseToken = async (_id: string) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide _id");
  }

  const result = await PurchaseTokenModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete purchase token",
    );
  }
  return result;
};

export const purchaseTokenService = {
  createPurchaseToken,
  getAllPurchasseToken,
  updatePurchaseToken,
  deletePurchaseToken,
};
