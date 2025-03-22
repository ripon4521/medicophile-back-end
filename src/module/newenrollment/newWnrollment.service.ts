import { IEnrollment } from "./newEnrollment.interface";
import enrollMentModel from "./newEnrollment.model";

const createEnrollment = async (payload: IEnrollment) => {
  const result = await enrollMentModel.create(payload);
  return result;
};

const getAllEnrollment = async () => {
  const result = await enrollMentModel.find();
  return result;
};

const getSingleEnrollment = async (_id: string) => {
  const result = await enrollMentModel.findOne({ _id });
  return result;
};

const updateEnrollment = async (_id: string, payload: IEnrollment) => {
  const result = await enrollMentModel.findOneAndUpdate({ _id }, payload);
  return result;
};

const deleteEnrollment = async (_id: string) => {
  const result = await enrollMentModel.findOneAndDelete({ _id });
  return result;
};

export const enrollmentService = {
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getAllEnrollment,
  getSingleEnrollment,
};
