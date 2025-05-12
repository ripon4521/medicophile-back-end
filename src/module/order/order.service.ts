import mongoose from "mongoose";
import { IOrder } from "./order.interface";

import { StatusCodes } from "http-status-codes";
import OrderModel from "./order.model";
import AppError from "../../helpers/AppError";
import OrderDetailsModel from "../orderDetails/orderDetails.model";
import QueryBuilder from "../../builder/querybuilder";
import { ProductModel } from "../product/product.model";
import CouponModel from "../coupon/coupon.model";
import { UserModel } from "../user/user.model";

const createOrderWithDetails = async (payload: IOrder) => {
  const user = await UserModel.findOne({_id:payload.userId})
  if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const product = await ProductModel.findOne({
    _id: payload.productId,
    isDeleted: false,
  });
  if (payload.coupoun) {
    const coupon = await CouponModel.findOne({
      _id: payload.coupoun,
      isDeleted: false,
    });
    if (!coupon) {
      throw new AppError(StatusCodes.NOT_FOUND, "coupon not found");
    }
  }

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product Not Found");
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [order] = await OrderModel.create([payload], { session });
    if (!order) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create order.");
    }
    const orderDetailsPayload = {
      orderId: order._id,
      productId: payload.productId,
      quantity: payload.quantity,
      price: payload.paidAmount,
      status: order.status,
      userId:payload.userId,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      paymentStatus: order.paymentStatus,
      paymentInfo: order.paymentInfo,
    };
    await OrderDetailsModel.create([orderDetailsPayload], { session });
    await session.commitTransaction();
    session.endSession();
    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllOrderFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(OrderModel, query)
    .search(["name", "address"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "productId",
    })
    .populate({
      path: "userId",
      select:"name role phone profile_picture"
    })
    .populate([
      {
        path: "coupoun",
      },
    ]);

  const result = await courseQuery.exec();
  return result;
};

const deleteOrderWithOrderDetails = async (_id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Order খুঁজে বের করা
    const order = await OrderModel.findOne({ _id, isDeleted: false }).session(
      session,
    );

    if (!order) {
      throw new AppError(StatusCodes.NOT_FOUND, "Order not found.");
    }

    // Order ডিলিট (logical delete)
    await OrderModel.updateOne(
      { _id: order._id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
      { session },
    );

    // OrderDetails ডিলিট (logical delete)
    await OrderDetailsModel.findByIdAndUpdate(
      { orderId: order._id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Order এবং OrderDetails সফলভাবে ডিলিট হয়েছে।",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateOrderAndOrderDetailsCommonFields = async (
  orderId: string,
  data: {
    name?: string;
    phone?: string;
    address?: string;
  },
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await OrderModel.findOne({
      _id: orderId,
      isDeleted: false,
    }).session(session);

    if (!order) {
      throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
    }

    // Step 1: Update Order
    await OrderModel.updateOne({ _id: orderId }, data, { session });

    // Step 2: Update All Related OrderDetails
    await OrderDetailsModel.updateOne({ orderId: orderId }, data, { session });

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Order ও OrderDetails একসাথে আপডেট হয়েছে",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const orderService = {
  createOrderWithDetails,
  getAllOrderFromDb,
  deleteOrderWithOrderDetails,
  updateOrderAndOrderDetailsCommonFields,
};
