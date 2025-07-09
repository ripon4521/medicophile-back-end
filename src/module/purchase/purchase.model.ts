import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";
import { IPaymentInfo } from "../purchaseToken/purchaseToken.interface";
import courseModel from "../course/course.model";

// utils/bdTime.ts
export const getBDTime = () => new Date(Date.now() + 6 * 60 * 60 * 1000);


const paymentInfoSchema = new Schema<IPaymentInfo>(
  {
    transactionId: { type: String , default:''},
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Bank", "Cash", "Auto"],
      default:"Bikash"
    },
    accountNumber: { type: String , default:''},
    paymentMedium: {
      type: String,
      enum: ["personal", "agent", "merchant"],
      default:"personal"
    },
    paymentDate: { type: Date , default:new Date(new Date().getTime() + 6 * 60 * 60 * 1000)},
    proofUrl: { type: String , default:''},
  },
  { _id: false },
);
const PurchaseSchema = new Schema<IPurchase>(
  {
    studentId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    paymentInfo: { type: paymentInfoSchema },
    status: { type: String, enum: ["Archive", "Course Out", "Active"] },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial", "Refunded", "Rejected"],
      required: true,
    },
    purchaseToken: { type: Schema.Types.ObjectId, required: true , ref:"PurchaseToken" },
    subtotal: { type: Number },
    studentRoll:{type:String},
    isExpire:{type:Boolean, default:false},
    discount: { type: Number },
    charge: { type: Number },
    totalAmount: { type: Number },
    issuedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: getBDTime,
    },
  },
);




PurchaseSchema.pre("save", async function (next) {
  if (!this.studentRoll) {
    try {
      const course = await courseModel.findById(this.courseId).select("prefix");
      if (course?.prefix) {
        let studentRoll = "";
        let isUnique = false;

        while (!isUnique) {
          const randomNumber = Math.floor(1000 + Math.random() * 9000); // e.g. 3947
          studentRoll = `${course.prefix}-${randomNumber}`; // e.g. WD-3947

          const existing = await PurchaseModel.findOne({
            courseId: this.courseId,
            studentRoll: studentRoll,
          });

          if (!existing) {
            isUnique = true;
            this.studentRoll = studentRoll;
          }
        }
      }
    } catch (error) {
      console.log(error)
      return next();
    }
  }
  next();
});









export const PurchaseModel = model<IPurchase>("Purchase", PurchaseSchema);
