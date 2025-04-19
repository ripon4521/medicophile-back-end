import { Schema, model, Types } from "mongoose";
import { IPaymentDetails } from "./paymentDetails.interface";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";



const paymentInfoSchema = new Schema<IPaymentInfo>(
  {
    transactionId: { type: String, required: true },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash"],
      required: true,
    },
    accountNumber: { type: String },
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
    },
    paymentDate: { type: Date }, 
    proofUrl: { type: String },
  },
  { _id: false }
);


const PaymentDetailsSchema = new Schema<IPaymentDetails>({
 
  purchaseId: {
    type: Schema.Types.ObjectId,
    ref: "Purchase"
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  paidAmount: {
    type: Number,
  },
  paymentInfo: { type:paymentInfoSchema},
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
},  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
    }
  });

 const PaymentDetailsModel = model<IPaymentDetails>("PaymentDetails", PaymentDetailsSchema);
 export default PaymentDetailsModel;
