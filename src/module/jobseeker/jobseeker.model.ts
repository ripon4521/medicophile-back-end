import { model, Schema } from "mongoose";
import { IJobSeeker } from "./jobseeker.interface";


const JobSeekerSchema = new Schema<IJobSeeker>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        skills: {
            type: [String],
            default: []
        },
        experience: [
            {
                title: String,
                company: String,
                duration: String
            }
        ],
        education: [
            {
                degree: String,
                institution: String,
                year: Number
            }
        ],
        resume: { 
            type: String 
        },
        preferences: {
            remote_work: Boolean,
            location: String,
            salary_range: String,
        },
    },
    { timestamps: true }
);

export const JobSeekerModel = model<IJobSeeker>("JobSeeker", JobSeekerSchema);

