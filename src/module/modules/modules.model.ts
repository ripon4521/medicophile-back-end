import mongoose, { Schema } from "mongoose";
import { IModules } from "./modules.interface";
import slugify from "slugify";


const ModuleSchema = new Schema<IModules>(
    {
      slug: { type: String},
      moduleTitle: { type: String, required: true, trim: true },
      courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      deletedAt:{ type: Date, default:null},
      isDeleted:{ type: Boolean, required:true}
    },
    { timestamps: true }
  );


  ModuleSchema.pre("save", function (next) {
    if (this.isModified("moduleTitle")) {
      this.slug = slugify(this.moduleTitle, { lower: true, strict: true });
    }
    next();
  });
  
  ModuleSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate() as Record<string, any>; 
    if (update?.moduleTitle) {
      update.slug = slugify(update.moduleTitle, { lower: true, strict: true });
    }
    next();
  });

  const ModuleModel = mongoose.model<IModules>("Module", ModuleSchema);
  
  export default ModuleModel;