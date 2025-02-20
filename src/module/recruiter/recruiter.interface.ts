import { Schema } from "mongoose";

export interface IRecruiter {
    user: Schema.Types.ObjectId;
    company_name: string;
    company_description: string;
    industry: string;
    website?: string;
    logo?: string;
}
