import { IClassSchedule } from "./classschedule.interface";
import ClassScheduleModel from "./classschedule.model";


const createClassscheduleIntoDB = async (payload: IClassSchedule) => {
    try {
        const newSchedule = new ClassScheduleModel(payload);
        await newSchedule.save();
        return newSchedule;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create class schedule: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating the class schedule.");
    }

};
const getsingleClassscheduleById = async (_id: string) => {
    const result = await ClassScheduleModel.findOne({ _id });
    return result;
}

const updateClassscheduleInDb = async (_id: string, payload: Partial<IClassSchedule>) => {
    const result = await ClassScheduleModel.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
}

const deleteClassscheduleFromDb = async (_id: string) => {
    const result = await ClassScheduleModel.findOneAndDelete({ _id });
    return result;
}

const getAllClassscheduleIntoDB = async () => {
    try {
        const result = await ClassScheduleModel.find().populate('courseId facultyId');
        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create class schedule: ${error.message}`);
        }
        throw new Error("An unknown error occurred while creating the class schedule.");
    }

};



export const classscheduleService = {
    createClassscheduleIntoDB,
    getAllClassscheduleIntoDB,
    getsingleClassscheduleById,
    updateClassscheduleInDb,
    deleteClassscheduleFromDb,

}