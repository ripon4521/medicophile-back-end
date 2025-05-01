import mongoose from "mongoose";
import { IOrder } from "./order.interface";

import { StatusCodes } from "http-status-codes";
import OrderModel from "./order.model";
import AppError from "../../helpers/AppError";
import OrderDetailsModel from "../orderDetails/orderDetails.model";
import QueryBuilder from "../../builder/querybuilder";


 const createOrderWithDetails = async (payload: IOrder) => {
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
      name:payload.name,
      phone:payload.phone,
      address:payload.address,
      paymentStatus:order.paymentStatus,
      paymentInfo:order.paymentInfo



    
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
      .populate([
        {
          path: "coupon",
        },
      ]);
  
    const result = await courseQuery.exec(); 
    return result;
  };

