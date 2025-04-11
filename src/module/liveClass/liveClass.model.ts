

import { Schema, model, Types } from "mongoose";
import { ILiveClass } from "./liveClass.inerface";
import slugify from "slugify";


const liveClassSchema = new Schema<ILiveClass>(
  {
    slug: {
      type: String,
      
    
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, "Course ID is required"],
      ref: "Course",
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
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


liveClassSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});



 const LiveClassModel = model<ILiveClass>("LiveClass", liveClassSchema);
 export default  LiveClassModel;
