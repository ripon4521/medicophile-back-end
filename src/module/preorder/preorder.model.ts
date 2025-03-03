import mongoose, { Schema } from "mongoose";
import { IPreOrder } from "./preorder.interface";

const PreOrderSchema = new Schema<IPreOrder>({
    user: { type: String, required: true, ref: "user" },
    selected_meals_id: { type: String, required: true, ref: "meal"},
    total_price: { type: Number, required: true, min: 0 },
    pickup_time: { type: String, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], required: true, default: "Pending"},
  });
  
  export const PreOrderModel = mongoose.model<IPreOrder>("PreOrder", PreOrderSchema);