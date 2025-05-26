// models/sales.model.ts
import { model, Schema } from "mongoose";
import { ISales } from "./accounts.interface";


const salesSchema = new Schema<ISales>(
  {
    source: { type: String, enum: ["sales"], default: "sales" },
    purchaseId: { type: Schema.Types.ObjectId, required: true, ref: "Purchase" },
    customerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    amount: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

export const SalesModel = model<ISales>("SalesIncome", salesSchema);
