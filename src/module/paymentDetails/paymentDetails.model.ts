import { Schema, model, Types } from "mongoose";
import { IPaymentDetails } from "./paymentDetails.interface";
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

const PaymentDetailsSchema = new Schema<IPaymentDetails>(
  {
    purchaseId: {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paidAmount: {
      type: Number,
    },
    paymentInfo: { type: paymentInfoSchema  },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const PaymentDetailsModel = model<IPaymentDetails>(
  "PaymentDetails",
  PaymentDetailsSchema,
);
export default PaymentDetailsModel;
