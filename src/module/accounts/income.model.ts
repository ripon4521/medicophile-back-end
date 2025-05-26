// models/order.model.ts
import { model, Schema } from "mongoose";
import { IIncome } from "./accounts.interface";



const orderSchema = new Schema<IIncome>(
  {
    source: { type: String, enum: ["order"], default: "order" },
    orderId: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
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

export const IncomeModel = model<IIncome>("OrderIncome", orderSchema);
