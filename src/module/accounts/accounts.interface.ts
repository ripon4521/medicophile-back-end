import { Types } from "mongoose";



export interface IIncome {
  source: "order";
  orderId: Types.ObjectId;
  customerId?: Types.ObjectId;
  amount: number;
  isDeleted?:false;
  deletedAt?:Date

}

export interface ISales {
  source: "sales";
  purchaseId: Types.ObjectId;
  customerId: Types.ObjectId;
  amount: number;
  isDeleted?:false;
  deletedAt?:Date
}



export interface IExpense {
  slug:string;
  title: string, 
  description?: string, 
  amount: number,
  category: "rent" | "electricity" | "internet" | "salary" | "transport" | "others", 
  paymentMethod: "cash" | "bkash" | "nagad" | "bank" | "card",
  addedBy: Types.ObjectId, 
  isDeleted:false;
  deletedAt:Date



}