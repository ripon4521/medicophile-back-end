// models/expense.model.ts
import { model, Schema } from "mongoose";
import { IExpense } from "./accounts.interface";
import { generateUniqueSlug } from "../../utils/generateSlug";


const expenseSchema = new Schema<IExpense>(
  {
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["rent", "electricity", "internet", "salary", "transport", "others"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "bkash", "nagad", "bank", "card"],
      required: true,
    },
    addedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

expenseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug;
  }
  next();
});


export const ExpenseModel = model<IExpense>("Expense", expenseSchema);
