import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICoupon } from "./coupon.interface";
import CouponModel from "./coupon.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";

const createCouponIntoDb = async (payload: ICoupon): Promise<ICoupon> => {
  const user = await UserModel.findOne({ _id: payload.createdBy });
  if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id. only admin or teacher created coupon",
    );
  }
  const result = await CouponModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create coupon. Please try again",
    );
  }
  return result;
};

const getAllCuponFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CouponModel, query)
    .search(["coupon"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "createdBy",
        select: "role name phone profile_picture",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const updateCouponInDb = async (_id: string, payload: Partial<ICoupon>) => {
  const coupon = await CouponModel.findOne({ _id: _id });
  if (!coupon) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid coupon id.");
  }
  const update = await CouponModel.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Coupon. _id is not valid, reload or go back and try again",
    );
  }

  return update;
};

const deleteCouponFromDb = async (_id: string) => {
  const coupon = await CouponModel.findOne({ _id: _id });
  if (!coupon) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid coupon id.");
  }
  const result = await CouponModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "PLease Try Again ");
  }
  return result;
};

export const couponService = {
  createCouponIntoDb,
  updateCouponInDb,
  deleteCouponFromDb,
  getAllCuponFromDb,
};
