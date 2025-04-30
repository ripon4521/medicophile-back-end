import mongoose, { Schema } from "mongoose";
import { IModules } from "./modules.interface";
import slugify from "slugify";
import { generateUniqueSlug } from "../../utils/generateSlug";

const ModuleSchema = new Schema<IModules>(
  {
    slug: { type: String , unique:true},
    moduleTitle: { type: String, required: true, trim: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);
ModuleSchema.pre("save", function (next) {
  if (this.isModified("moduleTitle")) {
    const uniqueSlug = generateUniqueSlug(this.moduleTitle);
    this.slug = uniqueSlug; 
  }
  next();
});




const ModuleModel = mongoose.model<IModules>("Module", ModuleSchema);

export default ModuleModel;
