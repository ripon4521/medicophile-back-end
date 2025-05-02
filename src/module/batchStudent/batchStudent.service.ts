import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IBatchStudent } from "./batchStudent.interface";
import { UserModel } from "../user/user.model";
import { BatchStudentModel } from "./batchStudent.model";
import QueryBuilder from "../../builder/querybuilder";


const createBatchStudent = async (payload: IBatchStudent) => {

  const user = await UserModel.findOne({ _id: payload.studentId });
  if (!user || user.role !== "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id.",
    );
  } 

  const result = await BatchStudentModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to Create  .  try again",
    );
  }
  return result;
};


const getAllBatchStudents = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BatchStudentModel, query)
    .search(["studentId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([ { path: "courseId", },])
    .populate([{path:"batchId"}])
    .populate([{ path: "studentId", select: "name role phone profile_picture" } ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get  . please try again",
    );
  }
  return result;
};


const getSingleBatchStudent = async (_id: string) => {
    const result = await BatchStudentModel.findOne({ _id });
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to Create  . please try again",
      );
    }
    return result;
  };


 const updateBatchStudent = async (_id: string, payload: IBatchStudent) => {
    const result = await BatchStudentModel.findOneAndUpdate({ _id }, payload, {
      runValidators: true,
      new: true,
    });
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to update  . please try again",
      );
    }
    return result;
  };


  const deleteBatchStduent = async (_id: string) => {
    const result = await BatchStudentModel.findOneAndUpdate(
      { _id },
      {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
      },
      {
        new: true,
      },
    );
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Failed to delete  . please try again",
      );
    }
    return result;
  };
  

export const batchStudentService = {
    createBatchStudent,
    updateBatchStudent,
    deleteBatchStduent,
    getAllBatchStudents,
    getSingleBatchStudent
}