import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String , default:''},
    status: {
      type: String,
      enum: ["Pending", "Processing", "Courier", "Delivered"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Refunded"],
      default: "Pending",
    },
    paymentInfo: {
      transactionId: { type: String, required: true },
      method: {
        type: String,
        enum: ["Bkash", "Nagad", "Bank", "Cash"],
        required: true,
      },
      accountNumber: { type: String },
      medium: { type: String, enum: ["personal", "agent", "merchant"] },
      paymentDate: { type: Date },
      proofUrl: { type: String },
    },
    subTotal: { type: Number, required: true },
    discount: { type: Number },
    coupoun: { type: Schema.Types.ObjectId, ref: "Coupon" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    charge: { type: Number },
    shiping: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const OrderModel = model<IOrder>("Order", orderSchema);
export default OrderModel;
