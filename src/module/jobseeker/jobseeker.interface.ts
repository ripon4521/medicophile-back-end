import mongoose from "mongoose";

interface IExperience {
    title: string;
    company: string;
    duration: string;
}

interface IEducation {
    degree: string;
    institution: string;
    year: number;
}

export interface IJobSeeker  {
    user: mongoose.Types.ObjectId;
    skills: string[];
    experience: IExperience[];
    education: IEducation[];
    resume?: string;
    preferences: {
        remote_work: boolean;
        location: string;
        salary_range: string;
    };
}