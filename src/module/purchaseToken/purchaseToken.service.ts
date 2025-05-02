import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { UserModel } from "../user/user.model";
import { IPurchaseToken } from "./purchaseToken.interface";
import PurchaseTokenModel from "./purchaseToken.model";
import CouponModel from "../coupon/coupon.model";
import QueryBuilder from "../../builder/querybuilder";
import courseModel from "../course/course.model";

const createPurchaseToken = async (payload: IPurchaseToken) => {
  const student = await UserModel.findOne({ _id: payload.studentId });
  const course = await courseModel.findOne({
    _id: payload.courseId,
    isDeleted: false,
  });
  const coupon = await CouponModel.findOne({
    coupon: payload.coupon,
    isDeleted: false,
  });
  if (!coupon || coupon.coupon !== payload.coupon) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid coupon");
  }
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id");
  } else if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid course id");
  }

  const result = await PurchaseTokenModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create purchase token",
    );
  }


  return result;
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
