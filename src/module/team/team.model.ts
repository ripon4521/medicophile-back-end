
import mongoose, { Schema, Document } from 'mongoose';
import { ITeams } from './team.interface';
import slugify from 'slugify';


const teamSchema = new Schema<ITeams>(
  {
    slug:{ type: String},
    name: { type: String, required: true },
    description: { type: String, default:'' },
    profileImg: { type: String, default:'' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Archived"],
        default: "Active",
      },
    deletedAt: { type: Date},
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);



teamSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

teamSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update?.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

const Team = mongoose.model<ITeams>('Team', teamSchema);

export default Team;
