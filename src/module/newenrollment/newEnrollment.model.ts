import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { IEnrollment } from "./newEnrollment.interface";
import courseModel from "../course/course.model";

// Define the Mongoose schema
const EnrollmentSchema = new Schema<IEnrollment>(
  {
    
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    studentId:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    batchId:{
      type: Schema.Types.ObjectId,
      ref:"OfflineBatch"
    },
    paidAmont: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "bikash", "nagad", "roket"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "blocked"],
      default: "active",
    },
    transctionId: {
      type: String,
    },
    paymentNumber: {
      type: String,
    },
    studentRoll:{
      type:String
    },
    due:{
      type:Number,
      default:0
    },
    discount:{
      type:Number,
      default:0
    },discountReason:{
      type:String
    },
    name:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    deletedAt:{
      type:Date
    }

    
  },
 {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  }
);




EnrollmentSchema.pre("save", async function (next) {
  if (!this.studentRoll) {
    try {
      const course = await courseModel.findById(this.courseId).select("prefix");
      if (course?.prefix) {
        let studentRoll = "";
        let isUnique = false;

        while (!isUnique) {
          const randomNumber = Math.floor(1000 + Math.random() * 9000); // e.g. 3947
          studentRoll = `${course.prefix}-${randomNumber}`; // e.g. WD-3947

          const existing = await enrollMentModel.findOne({
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





// Create a Mongoose model from the schema
const enrollMentModel = mongoose.model<IEnrollment >(
  "Enrollments",
  EnrollmentSchema,
);

export default enrollMentModel;
