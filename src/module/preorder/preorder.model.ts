import mongoose, { Schema } from "mongoose";
import { IPreOrder } from "./preorder.interface";

const PreOrderSchema = new Schema<IPreOrder>({
  user: { type: String, required: true, ref: "User" },
  selected_meals: [
  
  ],
  total_price: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], required: true, default: "Pending" },
});

export const PreOrderModel = mongoose.model<IPreOrder>("PreOrder", PreOrderSchema);
