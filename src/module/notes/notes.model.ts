import mongoose, { Schema } from "mongoose";
import { INotes } from "./notes.interface";

const NotesSchema = new Schema<INotes>(
    {
      noteTitle: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      noteFile: { type: String, required: true }, // Should store file URL
      classTime: { type: String, required: true },
      launchingDate: { type: String, required: true },
      status: { type: String, enum: ["published", "drafted"], required: true },
    },
    { timestamps: true }
  );
  
  const NotesModel = mongoose.model<INotes>("Notes", NotesSchema);
  
  export default NotesModel;