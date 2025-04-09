import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IModuleDetails } from "./moduleDetails.interface";
import ModuleDetails from "./moduleDetails.model";
import QueryBuilder from "../../builder/querybuilder";

const createModuleDetails = async (payload: IModuleDetails) => {
  const result = await ModuleDetails.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create module details, please try again",
    );
  }
  return result;
};

const getAllModuleDetails = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(ModuleDetails, query)
    .filter()
    .paginate()
    .fields()
    .populate(["courseId"])
    .populate(["moduleId"])
    .populate(["contentId"]);

  const result = await courseQuery.exec();
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
      "Failed to load data , please reload and try again",
    );
  }
  return result;
};

const deleteModuleDetails = async (_id: string) => {
  if (!_id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "id not found ");
  }
  const result = await ModuleDetails.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // ✅ BD Time (UTC+6)
    },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete data, please provide a valid id",
    );
  }
};

const updateModuleDetails = async (_id: string, payload: IModuleDetails) => {
  try {
    const update = await ModuleDetails.findByIdAndUpdate(_id, payload, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      throw new Error("No data found with the provided ID");
    }

    return update;
  } catch (error) {
    console.error(error);
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred while updating",
    );
  }
};

export const moduleDetailsService = {
  createModuleDetails,
  getAllModuleDetails,
  getSingleModuleDetails,
  updateModuleDetails,
  deleteModuleDetails,
};
