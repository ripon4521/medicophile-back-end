import mongoose, { Schema } from "mongoose";
import { IResearch } from "./research.interface";

const ResearchSchema = new Schema<IResearch>({
  id: { type: String, unique: true }, // Custom ID field
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["In Progress", "Progress"],
    default: "In Progress",
  },
});

// Pre-save hook to auto-generate `id`
ResearchSchema.pre("save", async function (next) {
  if (!this.id) {
    // Find the last inserted research document
    const lastResearch = await ResearchModel.findOne({}, {}, { sort: { id: -1 } });

    let newId = "RP001"; // Default first ID

    if (lastResearch && lastResearch.id) {
      // Extract the numeric part from the last ID and increment it
      const lastIdNumber = parseInt(lastResearch.id.replace("RP", ""), 10);
      newId = `RP${String(lastIdNumber + 1).padStart(3, "0")}`;
    }

    this.id = newId;
  }
  next();
});

const ResearchModel = mongoose.model<IResearch>("Researchs", ResearchSchema);

export default ResearchModel;
