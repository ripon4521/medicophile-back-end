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



const createPurchaseToken = async (payload: IPurchaseToken) => {
  // Student create if missing
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
    if (!user) throw new AppError(StatusCodes.NOT_FOUND, '');
    payload.studentId = user._id;
  }

  const student = await UserModel.findOne({ _id: payload.studentId });
  const course = await courseModel.findOne({ _id: payload.courseId, isDeleted: false });

  if (!student) throw new AppError(StatusCodes.BAD_REQUEST, 'invalid student id');
  if (!course) throw new AppError(StatusCodes.BAD_REQUEST, 'invalid course id');

  // Coupon check
  if (payload.coupon) {
    const coupon = await CouponModel.findOne({ coupon: payload.coupon, isDeleted: false });
    if (!coupon || coupon.coupon !== payload.coupon) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'invalid coupon');
    }
  }

  // Save token
  const result = await PurchaseTokenModel.create(payload);
  if (!result) throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create purchase token');

  // Refer logic
  if (payload.ref) {
    await ReferDetails.create({
      referrerId: payload.ref,
      referredUserId: payload.studentId,
      courseId: payload.courseId,
      purchaseTokenId: result._id,
    });
  }
  // Automatic Payment Logic
if (payload.status === "Verified") {
    const purchasePayload: IPurchase = {
    ...payload,
    studentId: result.studentId,
    purchaseToken: result._id,
    paymentStatus: "Paid",
    status: "Active",
  };
   const res = await purchaseService.createPurchase(purchasePayload);
  if (!res) throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create purchase ');
}





  return result;
}






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
