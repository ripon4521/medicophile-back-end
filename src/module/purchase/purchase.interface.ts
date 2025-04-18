import { Types } from "mongoose";

export interface IPurchase {
        studentId:Types.ObjectId;
        status: "Archive" | "Course Out";
        paymentStatus:"Paid" | "Pending" | "Partial" | "Refunded";
        purchaseToken:string;
        subtotal:number;
        discount:number;
        charge:number;
        totalAmount:number;
        discountReason:string;
        issuedBy:Types.ObjectId;
        isDeleted:boolean;
        deletedAt:Date;

}