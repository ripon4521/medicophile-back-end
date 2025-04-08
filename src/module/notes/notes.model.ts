import mongoose, { Schema } from "mongoose";
import { INotes } from "./notes.interface";
import slugify from "slugify";

const NotesSchema = new Schema<INotes>(
  {
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    noteFile: { type: String },
    status: { type: String, enum: ["published", "drafted"], required: true, default:'published' },
    deletedAt: { type: Date, default:null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, // UTC+6 (Bangladesh Time)
  },
);


NotesSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

NotesSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.title) {
    update.slug = slugify(update.title, { lower: true, strict: true });
  }
  next();
});

const NotesModel = mongoose.model<INotes>("Notes", NotesSchema);

export default NotesModel;
