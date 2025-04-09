import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { UserCredentialsModel } from "./userCredentials.model";

const getAllCredentials = async () => {
  const result = await UserCredentialsModel.find({ isDeleted: false }).populate(
    "studentId",
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Credentials. Please try again",
    );
  }
  return result;
};

const getSingleCrtedentials = async (_id: string) => {
  const result = await UserCredentialsModel.findOne({ _id }).populate(
    "studentId",
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Credentials. Please try again",
    );
  }
  return result;
};

export const userCredentialsService = {
  getAllCredentials,
  getSingleCrtedentials,
};
