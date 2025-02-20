import { model, Schema } from "mongoose";
import { IRecruiter } from "./recruiter.interface";

const RecruiterSchema = new Schema<IRecruiter>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        company_name: {
            type: String,
            required: true
        },
        company_description: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        },
        website: {
            type: String
        },
        logo: {
            type: String
        },
    },
    { timestamps: true }
);

export const RecruiterModel = model<IRecruiter>("Recruiter", RecruiterSchema);
