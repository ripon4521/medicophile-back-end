import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
