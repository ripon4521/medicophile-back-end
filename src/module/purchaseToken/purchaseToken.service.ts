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
    // Validate studentId or try to find by phone
    if (!payload.studentId) {
      if (payload.phone && payload.phone.trim() !== "") {
        const user = await UserModel.findOne({ phone: payload.phone.trim() }).session(session);
        if (user) {
          payload.studentId = user._id;
        }
      }

      // If still no studentId, create new student + user
      if (!payload.studentId) {
        // Basic validation for required fields before creating student
        if (!payload.name || payload.name.trim() === "") {
          throw new AppError(StatusCodes.BAD_REQUEST, "Student name is required to create new student");
        }
        if (!payload.phone || payload.phone.trim() === "") {
          throw new AppError(StatusCodes.BAD_REQUEST, "Phone number is required to create new student");
        }

        const studentPayload:IStudent = {
          name: payload.name.trim(),
          phone: payload.phone.trim(),
          email: '', // Optional or blank
          role: 'student',
          profile_picture: '',
          userId: undefined,
          status: 'Active',
          isDeleted: false,
          password: '', // Should be hashed if set later
          gurdianName: '',
          gurdianPhone: '',
          address: '',
        };

        const { user } = await createStudentWithUser(studentPayload, session);
        if (!user) {
          throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Student creation failed');
        }
        payload.studentId = user._id;
      }
    }

    // Validate course existence
    const course = await courseModel.findOne({ _id: payload.courseId, isDeleted: false }).session(session);
    if (!course) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid course id');
    }

    // Create PurchaseToken document
    const result = await PurchaseTokenModel.create([payload], { session });
    if (!result || result.length === 0) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create purchase token');
    }

    const purchaseToken = result[0];

    // Create referral detail if referrer exists
    if (payload.ref) {
      await ReferDetails.create([{
        referrerId: payload.ref,
        referredUserId: payload.studentId,
        courseId: payload.courseId,
        purchaseTokenId: purchaseToken._id,
      }], { session });
    }

    // Create Purchase entry based on PurchaseToken info
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
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create purchase');
    }

    // Commit transaction & end session
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

export default createPurchaseToken;





 






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
