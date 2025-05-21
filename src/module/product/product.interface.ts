import { Types } from "mongoose";

export interface IProduct {
  slug: string;
  title: string;
  pdf?: string;
  description?: string;
  trailer?: string;
  bookType:"Hard Copy" | "PDF"
  categoryId: Types.ObjectId;
  status: "Active" | "Drafted";
  price: number;
  offerPrice: number;
  stock: "In Stock" | "Out Off Stock";
  coverPhoto: string;
  createdBy: Types.ObjectId;
  deletedAt: Date;
  isDeleted: boolean;
  tags: string[];
}
