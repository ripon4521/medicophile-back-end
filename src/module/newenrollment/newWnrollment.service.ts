import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { OfflineBatchModel } from "../offlineBatch/offlineBatch.model";
import { IEnrollment } from "./newEnrollment.interface";
import enrollMentModel from "./newEnrollment.model";
import { createStudentWithUser } from "../../utils/createStudentForPurchase";
import { IStudent } from "../student/student.interface";
import { UserModel } from "../user/user.model";
import courseModel from "../course/course.model";
import PurchaseTokenModel from "../purchaseToken/purchaseToken.model";
import { PurchaseModel } from "../purchase/purchase.model";
import { BatchStudentModel } from "../batchStudent/batchStudent.model";

import mongoose from 'mongoose';
import QueryBuilder from "../../builder/querybuilder";

const createEnrollment = async (payload: IEnrollment) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (payload.batchId) {
      const batch = await OfflineBatchModel.findOne({ _id: payload.batchId }).session(session);
      if (!batch) {
        throw new AppError(StatusCodes.NOT_FOUND, "Not Found Batch");
      }
    }

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

    const { user } = await createStudentWithUser(studentPayload); // Ensure this function supports session

    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Student Create Failed');
    }

    payload.studentId = user._id;
    const student = await UserModel.findOne({ _id: payload.studentId }).session(session);
    if (!student) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Student Not Found ');
    }

    const course = await courseModel.findOne({ _id: payload.courseId }).session(session);
    if (!course) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Course Not Found');
    }

    const generatedToken = `PT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const price = course.price || 0;
    const discount = course.offerPrice ? price - course.offerPrice : 0;
    const subtotal = price;
    const charge = 0;
    const totalAmount = subtotal - discount + charge;

    const purchaseToken = await PurchaseTokenModel.create(
      [{
        studentId: payload.studentId,
        courseId: payload.courseId,
        status: "Enrolled",
        purchaseToken: generatedToken,
        price,
        subtotal: payload.paidAmont,
        discount: payload.discount,
        charge,
        totalAmount,
        name: user.name,
        phone: user.phone,
      }],
      { session }
    );

    const purchase = await PurchaseModel.create(
      [{
        studentId: payload.studentId,
        courseId: payload.courseId,
        paymentInfo: undefined,
        status: "Active",
        paymentStatus: "Paid",
        purchaseToken: purchaseToken[0]._id,
        subtotal: payload.paidAmont,
        discount: payload.discount,
        charge,
        totalAmount,
      }],
      { session }
    );

    if (course.course_type === "offline") {
      await BatchStudentModel.create([{
        studentId: payload.studentId,
        courseId: payload.courseId,
        batchId: payload.batchId,
      }], { session });
    }

    const result = await enrollMentModel.create([payload], { session });

    await session.commitTransaction();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};



const getAllEnrollment = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(enrollMentModel, query)
    .search(["name", "phone"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "courseId",
    })
    .populate({
      path: "studentId",
      select: "name role phone profile_picture",
    });

  // ✅ Conditionally populate batch if batchId is present in query
  if (query.batchId) {
    courseQuery.populate({
      path: "batchId",
      match: { _id: query.batchId },
    });
  }

  const result = await courseQuery.exec();
  return result;
};



const getSingleEnrollment = async (_id: string) => {
  const enrollment = await enrollMentModel.findOne({ _id })
    .populate("studentId")
    .populate("courseId");

  // ✅ Only populate batchId if it exists in the enrollment
  if (enrollment?.batchId) {
    await enrollment.populate("batchId");
  }

  return enrollment;
};


const updateEnrollment = async (_id: string, payload: IEnrollment) => {
  const result = await enrollMentModel.findOneAndUpdate({ _id }, payload, {
    runValidators:true,
    new:true
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to updated enrollmemt")
  }
  return result;
};

const deleteEnrollment = async (_id: string) => {
  const result = await enrollMentModel.findOneAndUpdate({ _id }, {
    isDeleted:true,
    deletedAt:new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
  });
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to deleted enrollmemt")
  }
  return result;
};

export const enrollmentService = {
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getAllEnrollment,
  getSingleEnrollment,
};
