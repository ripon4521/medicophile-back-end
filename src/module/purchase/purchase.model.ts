import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";

const PurchaseSchema = new Schema<IPurchase>(
    {
      studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      status: { type: String, enum: ["Archive", "Course Out"], required: true },
      paymentStatus: {
        type: String,
        enum: ["Paid", "Pending", "Partial", "Refunded"],
        required: true,
      },
      purchaseToken: { type: String, required: true },
      subtotal: { type: Number, required: true },
      discount: { type: Number, required: true },
      charge: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      discountReason: { type: String, required: true },
      issuedBy: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
      isDeleted: { type: Boolean, required: true, default: false },
      deletedAt: { type: Date, default: null },
    },
    {
        timestamps: {
          currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        }
      }
  );
  
  export const PurchaseModel = model<IPurchase>("Purchase", PurchaseSchema);