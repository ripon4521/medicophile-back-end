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
    const result = await ClassScheduleModel.findOne({ _id }).populate('courseId').populate('facultyId');
    return result;
}


const updateClassscheduleInDb = async (_id: string, payload: Partial<IClassSchedule>) => {
    if (payload.day && Array.isArray(payload.day)) {
      for (const dayUpdate of payload.day) {
        const updateData: any = {};
        if (dayUpdate.day) updateData.day = dayUpdate.day;
        if (dayUpdate.time) updateData.time = dayUpdate.time;
        console.log("Updating subdocument:", dayUpdate._id, "with data:", updateData);
        const result = await ClassScheduleModel.updateOne(
          { _id, "day._id": dayUpdate._id }, 
          { $set: { "day.$.day": updateData.day, "day.$.time": updateData.time } }
        );
        console.log("Update result:", result);
  
        if (!result.modifiedCount) {
          console.log("No matching subdocument found or no changes were made.");
        } else {
          console.log("Subdocument updated successfully.");
        }
      }
    }
    const updatedParentDoc = await ClassScheduleModel.findById(_id);
    return updatedParentDoc;
  };
  
  
  

const deleteClassscheduleFromDb = async (_id: string) => {
    const result = await ClassScheduleModel.findOneAndDelete({ _id });
    return result;
}


const getAllClassscheduleIntoDB = async () => {
    try {
        const result = await ClassScheduleModel.find().populate('courseId').populate('facultyId');
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