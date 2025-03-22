import mongoose, { Schema } from "mongoose";
import { IClassSchedule } from "./classschedule.interface";
import { optional } from "zod";

const daySchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: {
        type: String,
      
    },
  });

const ClassScheduleSchema = new Schema<IClassSchedule>({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    facultyId: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
  
    day: {
        type: [daySchema],  
        required: true,
      },
},{
    timestamps:true
});

const ClassScheduleModel = mongoose.model<IClassSchedule>("classSchedules", ClassScheduleSchema);

export default ClassScheduleModel;
