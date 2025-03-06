import mongoose, { Schema } from "mongoose";
import { ICanteenstaffUser } from "./canteenstaff.interface";

const CanteenstaffUserSchema = new Schema<ICanteenstaffUser>({
    role: {
        type: String,
        enum: ['canteen_staff'],
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profile_picture: {
        type: String,
    },
    status: {
        type: String,
        enum: ["unblocked", "blocked"],
        default: "unblocked",
    },
    staff_id: {
        type: String,
        required: true,
        unique: true,
    },
    canteen_section: {
        type: String,
        required: true,
    },
    shift_timing: {
        type: String,
    },
});


CanteenstaffUserSchema.pre("save", async function (next) {
    const existingStudent = await mongoose.model("Canteenstaffs").findOne({
      $or: [{ staff_id: this.staff_id }, { gmail: this.gmail }],
    });
    if (existingStudent) {
      const error = new Error("Student with this ID or Gmail already exists");
      return next(error);
    }
    next();
  });
  


const  CanteenstaffUserModel = mongoose.model<ICanteenstaffUser>("Canteenstaffs", CanteenstaffUserSchema);

export default CanteenstaffUserModel;
