import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBatchStudent } from "./batchStudent.interface";
import { UserModel } from "../user/user.model";
import { BatchStudentModel } from "./batchStudent.model";
import QueryBuilder from "../../builder/querybuilder";
import courseModel from "../course/course.model";
import { IPurchase } from "../purchase/purchase.interface";
import mongoose from "mongoose";
import PurchaseTokenModel from "../purchaseToken/purchaseToken.model";
import { PurchaseModel } from "../purchase/purchase.model";

const createBatchStudent = async (payload: IBatchStudent) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findOne({ _id: payload.studentId }).session(session);
    if (!user || user.role !== "student") {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid student ID.");
    }

    const course = await courseModel.findOne({ _id: payload.courseId }).session(session);
    if (!course) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Invalid course ID.");
    }

    const generatedToken = `PT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const price = course?.price || 0;
    const discount = course?.offerPrice ? price - course.offerPrice : 0;
    const subtotal = price;
    const charge = 0;
    const totalAmount = subtotal - discount + charge;

    // Create Purchase Token
    const purchaseToken = await PurchaseTokenModel.create(
      [{
        studentId: payload.studentId,
        courseId: payload.courseId,
        status: "Enrolled",
        purchaseToken: generatedToken,
        price,
        subtotal,
        discount,
        charge,
        totalAmount,
        name: user.name,
        phone: user.phone,
      }],
      { session }
    );

    // Create Purchase
    const purchase = await PurchaseModel.create(
      [{
        studentId: payload.studentId,
        courseId: payload.courseId,
        paymentInfo: undefined,
        status: "Active",
        paymentStatus: "Paid",
        purchaseToken: purchaseToken[0]._id,
        subtotal,
        discount,
        charge,
        totalAmount,  
      }],
      { session }
    );

    // Create Batch Student
    const batchStudent = await BatchStudentModel.create([payload], { session });

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return {
      message: "Batch student created with purchase and token.",
      purchaseToken: purchaseToken[0],
      purchase: purchase[0],
      batchStudent: batchStudent[0],
    };

  } catch (error) {
    // ❌ Rollback transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};












const getAllBatchStudents = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BatchStudentModel, query)
    .search(["studentId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "courseId",
        select: "cover_photo course_title duration course_type ",
      },
    ])
    .populate([{ path: "batchId", select: "name" }])
    .populate([
      { path: "studentId", select: "name role phone profile_picture" },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get  . please try again",
    );
  }
  return result;
};

const getSingleBatchStudent = async (_id: string) => {
  const result = await BatchStudentModel.findOne({ _id })
    .populate([
      {
        path: "courseId",
        select: "cover_photo course_title duration course_type ",
      },
    ])
    .populate([{ path: "batchId", select: "name" }])
    .populate([
      { path: "studentId", select: "name role phone profile_picture" },
    ]);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create  . please try again",
    );
  }
  return result;
};

const updateBatchStudent = async (_id: string, payload: IBatchStudent) => {
  const result = await BatchStudentModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update  . please try again",
    );
  }
  return result;
};

const deleteBatchStduent = async (_id: string) => {
  const result = await BatchStudentModel.findOneAndUpdate(
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
      "Failed to delete  . please try again",
    );
  }
  return result;
};

export const batchStudentService = {
  createBatchStudent,
  updateBatchStudent,
  deleteBatchStduent,
  getAllBatchStudents,
  getSingleBatchStudent,
};
