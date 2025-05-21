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
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";
import { IStudent } from "../student/student.interface";
import { createStudentWithUser } from "../../utils/creaetStudentForOrder";


const createOrderWithDetails = async (payload: IOrder) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
     if (!payload.userId) {
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
        payload.userId = user._id;
      }




    // Validate User
    const user = await UserModel.findOne({ _id: payload.userId }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    // Validate Product
    const product = await ProductModel.findOne({ _id: payload.productId, isDeleted: false }).session(session);
    if (!product) {
      throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
    }

    // Validate Coupon (if exists)
    if (payload.coupoun) {
      const coupon = await CouponModel.findOne({ _id: payload.coupoun, isDeleted: false }).session(session);
      if (!coupon) {
        throw new AppError(StatusCodes.NOT_FOUND, "Coupon not found");
      }
    }

    // Create Order
    const [order] = await OrderModel.create([payload], { session });
    if (!order) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create order");
    }

    // Prepare Payment Info
    let paymentInfo: IPaymentInfo | undefined = order.paymentInfo;

    if (payload.paymentStatus === "Paid") {
      paymentInfo = {
        transactionId: '',
        method: "Auto",
        accountNumber: '',
        paymentMedium: 'personal',
        proofUrl: '',
        paymentDate: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // +6 hours
      };
    }

    // Create Order Details
    const orderDetailsPayload = {
      orderId: order._id,
      productId: payload.productId,
      quantity: payload.quantity,
      price: payload.paidAmount,
      status: order.status,
      userId: payload.userId,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      paymentStatus: order.paymentStatus,
      paymentInfo,
    };

    const [orderDetails] = await OrderDetailsModel.create([orderDetailsPayload], { session });
    if (!orderDetails) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create order details");
    }

    // Commit the transaction
    await session.commitTransaction();
    return order;

  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
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
