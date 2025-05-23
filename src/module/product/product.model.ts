import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";
import { generateUniqueSlug } from "../../utils/generateSlug";

const productSchema = new Schema<IProduct>(
  {
    slug: { type: String, unique: true },
    title: { type: String },
    pdf: { type: String, default: "" },
    uploadLink: { type: String, default: "" },
    description: { type: String },
    previewPdf:{type:String},
    trailer: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "BookCategory",
      required: true,
    },
    status: { type: String, enum: ["Active", "Drafted"], required: true },
    bookType: { type: String, enum: ["Hard copy", "Ebook"], required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, default: 0 },
    stock: {
      type: String,
      enum: ["In Stock", "Out Off Stock"],
      required: true,
    },
    coverPhoto: { type: String, default: "" },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug;
  }
  next();
});

export const ProductModel = model<IProduct>("Product", productSchema);
