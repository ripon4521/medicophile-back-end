import { Schema, model, Types } from "mongoose";
import { ILiveClass } from "./liveClass.inerface";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

const liveClassSchema = new Schema<ILiveClass>(
  {
    slug: {
      type: String,
      unique: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, "Course ID is required"],
      ref: "Course",
    },
    link:{
      type:String,
      required:true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "CreatedBy is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Published", "Drafted"],
      required: [true, "Status is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
liveClassSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const uniqueSlug = generateUniqueSlug(this.title);
    this.slug = uniqueSlug;
  }
  next();
});

const LiveClassModel = model<ILiveClass>("LiveClass", liveClassSchema);
export default LiveClassModel;
