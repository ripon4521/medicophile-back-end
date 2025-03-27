import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IModuleDetails } from "./moduleDetails.interface";
import ModuleDetails from "./moduleDetails.model";

const createModuleDetails = async (payload: IModuleDetails) => {
  const result = await ModuleDetails.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create module details, please try again"
    );
  }
  return result;
};

const getAllModuleDetails = async () => {
  const result = await ModuleDetails.find()
    .populate("courseId")
    .populate("moduleId")
    .populate("contentId");
  return result;
};

const getSingleModuleDetails = async (_id: string) => {
  const result = await ModuleDetails.findOne({ _id })
    .populate("courseId")
    .populate("moduleId")
    .populate("contentId");
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to load data , please reload and try again"
    );
  }
  return result;
};

const deleteModuleDetails = async (_id: string) => {
  const result = await ModuleDetails.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true }
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete data, please reload and try again"
    );
  }
};

const updateModuleDetails = async (_id: string, payload: IModuleDetails) => {
  const update = await ModuleDetails.findOneAndUpdate({ _id }, payload, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to updated data, reload and check your updated data and try again"
    );
  }

  return update;
};

export const moduleDetailsService = {
    createModuleDetails,
    getAllModuleDetails,
    getSingleModuleDetails,
    updateModuleDetails,
    deleteModuleDetails
}