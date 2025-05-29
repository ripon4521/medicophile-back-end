import { model, Schema } from "mongoose";
import { IPaymentInfo, IPurchaseToken } from "./purchaseToken.interface";
import crypto from "crypto"; // for secure random token generation

const paymentInfoSchema = new Schema<IPaymentInfo>(
  {
    transactionId: { type: String , default:""},
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash", "Auto"],
      default:"Bkash"
    },
    accountNumber: { type: String ,  default:""},
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
       default:"personal"
    },
    paymentDate: { type: Date , default:new Date(new Date().getTime() + 6 * 60 * 60 * 1000)},
    proofUrl: { type: String ,  default:""},
  },
  { _id: false },
);

const purchaseTokenSchema = new Schema<IPurchaseToken>(
  {
    studentId: { type: Schema.Types.ObjectId,  ref: "User" },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    status: {
      type: String,
      enum: [
        "Verified",
        "Unverified",
        "Rejected",
        "Pending",
        "Refunded",
        "Partial",
        "Enrolled"
      ],
      default: "Verified",
    },
    purchaseToken: { type: String },
    coupon: { type: String },
    ref: { type: Schema.Types.ObjectId, ref: "User" },
    price: { type: Number },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    charge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentInfo: { type: paymentInfoSchema },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);



// ✅ Pre-save hook to generate token & set payment date
purchaseTokenSchema.pre("save", function (next) {
  const doc = this as any;

  // Generate secure token if not already set
  if (!doc.purchaseToken) {
    const unique = crypto.randomBytes(8).toString("hex").toUpperCase();
    doc.purchaseToken = `PT-${unique}`;
  }

  next();
});

const PurchaseTokenModel = model<IPurchaseToken>(
  "PurchaseToken",
  purchaseTokenSchema,
);

export default PurchaseTokenModel;
