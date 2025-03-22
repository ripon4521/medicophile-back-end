import { ILeecture } from "./lecture.interface";
import LectureModel from "./lecture.model";
import { lectureValidation } from "./lecture.validation";

const createLecture = async ( payload: ILeecture) => {
    const create = await LectureModel.create(payload);
    return create;
}

const updateLecture = async (_id: string, payload: Partial<ILeecture>) => {
    try {
 
  
      const update = await LectureModel.findOneAndUpdate(
        { _id },
        payload,
        { new: true, runValidators: true }
      );
  
      if (!update) {
        throw new Error("Lecture not found or update failed.");
      }
  
      return update;
    } catch (error) {
      console.error("Update Lecture Error:", error);
      throw error;
    }
  };

const deleteLecture = async (_id:string) => {
    const result = await LectureModel.findOneAndDelete({_id});
    return result;
}

const getAllLecture = async () => {
    const result = await LectureModel.find().populate('createdBy').populate({
        path: 'courseId',
        populate: { path: 'category' },
      });
    return result;
}

const getSingleLecture = async(_id:string) => {
    const result = await LectureModel.findOne({_id}).populate('createdBy').populate({
        path: 'courseId',
        populate: { path: 'category' },
      });;
    return result;
}


export const lectureServices = {
    createLecture,
    updateLecture,
    deleteLecture,
    getAllLecture,
    getSingleLecture
}