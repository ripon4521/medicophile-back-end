import { Schema, model, Types } from "mongoose";
import { IOrderDetails } from "./orderDetails.interface";

const orderDetailsSchema = new Schema<IOrderDetails>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    price: { type: Number, required: true },
    paymentInfo: {
      transactionId: { type: String },
      method: {
        type: String,
        enum: ["Bkash", "Nagad", "Bank", "Cash", "Auto"],
       
      },
      accountNumber: { type: String },
      medium: { type: String, enum: ["personal", "agent", "merchant"] },
      paymentDate: { type: Date },
      proofUrl: { type: String },
    },
    status: {
      type: String,
      enum: ["Refunded", "Delivered", "Courier", "Pending"],
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const OrderDetailsModel = model<IOrderDetails>(
  "OrderDetails",
  orderDetailsSchema,
);
export default OrderDetailsModel;
