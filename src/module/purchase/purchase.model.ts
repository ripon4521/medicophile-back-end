import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";

const paymentInfoSchema = new Schema<IPaymentInfo>(
  {
    transactionId: { type: String , default:''},
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash", "Auto"],
      default:"Bikash"
    },
    accountNumber: { type: String , default:''},
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
      default:"personal"
    },
    paymentDate: { type: Date , default:new Date(new Date().getTime() + 6 * 60 * 60 * 1000)},
    proofUrl: { type: String , default:''},
  },
  { _id: false },
);
const PurchaseSchema = new Schema<IPurchase>(
  {
    studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    paymentInfo: { type: paymentInfoSchema },
    status: { type: String, enum: ["Archive", "Course Out", "Active"] },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial", "Refunded", "Rejected"],
      required: true,
    },
    purchaseToken: { type: Schema.Types.ObjectId, required: true },
    subtotal: { type: Number },
    discount: { type: Number },
    charge: { type: Number },
    totalAmount: { type: Number },
    issuedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

export const PurchaseModel = model<IPurchase>("Purchase", PurchaseSchema);
