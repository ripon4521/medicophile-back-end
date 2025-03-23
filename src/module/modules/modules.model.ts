import mongoose, { Schema } from "mongoose";
import { IModules } from "./modules.interface";


const ModuleSchema = new Schema<IModules>(
    {
      serialNumber: { type: Number, required: true, min: 1 },
      moduleTitle: { type: String, required: true, trim: true },
      description: { type: String, trim: true }, 
      courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["published", "drafted"], required: true },
      launchingDate: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  const ModuleModel = mongoose.model<IModules>("Module", ModuleSchema);
  
  export default ModuleModel;