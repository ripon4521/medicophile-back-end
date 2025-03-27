import mongoose, { Schema } from "mongoose";
import { IModuleDetails } from "./moduleDetails.interface";

const moduleDetailsSchema = new Schema<IModuleDetails>({
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course', // Assuming there is a 'Course' model, adjust if necessary
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Module', // Assuming there is a 'Module' model, adjust if necessary
    },
    content_type: {
      type: String,
      enum: ['lecture', 'notes', 'exam'],
      required: true,
    },
    contentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Content', // Adjust if needed
    },
    status: {
      type: String,
      enum: ['published', 'drafted'],
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  }, {
    timestamps: { currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000) }, // UTC+6 (Bangladesh Time)
 
  });
  
  const ModuleDetails = mongoose.model<IModuleDetails>('ModuleDetails', moduleDetailsSchema);
  
  export default ModuleDetails;