import mongoose, { Schema } from "mongoose";
import { IClassSchedule } from "./classschedule.interface";

const ClassScheduleSchema = new Schema<IClassSchedule>({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    facultyId: {
        type: Schema.Types.ObjectId,
        ref: "Facultys",
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    }
});

const ClassScheduleModel = mongoose.model<IClassSchedule>("classSchedules", ClassScheduleSchema);

export default ClassScheduleModel;
