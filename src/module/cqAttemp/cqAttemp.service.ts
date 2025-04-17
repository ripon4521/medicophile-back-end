import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqAttemps } from "./cqAttemp.interface";
import CqAttempModel from "./cqAttemp.model";
import CqQuestionModel from "../classQuizeQuestion/classQuizeQuestion.model";
import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import ExamModel from "../exam/exam.model";

const createCqAttemps = async (payload: ICqAttemps) => {

  const student = await UserModel.findOne({_id:payload.studentId})
  const exam = await ExamModel.findOne({_id:payload.examId})
  const question = await CqQuestionModel.findOne({_id:payload.questionId})
  if (!student || student.role !== "student") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Student Id. ")
  } else if(!exam){
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Exam Id")
  } else if(!question){
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid Question Id")
  }

  const result = await CqAttempModel.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to cerate cq attemp")
  }

  
};


const getAllCqAttemps = async () => {
  const result = await CqAttempModel.find({ isDeleted: false })
    .populate({
      path:"studentId",
      select:"name role phone"
    })
    .populate({
      path:"examId",
      select:"examTitle examType cqMark"
    })
    .populate({
      path:"questionId",
      select:"question"
    })
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Cq Attemps . Please try again",
    );
  }
  return result;
};

const updateCqAttemps = async (_id: string, payload: ICqAttemps) => {
  const update = await CqAttempModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });

  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Cq Attemps . Please try again",
    );
  }
  return update;
};

const deleteCqAttemps = async (_id: string) => {
  const result = await CqAttempModel.findOneAndUpdate(
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
      "Failed to delete Cq Attemps . Please try again",
    );
  }
  return result;
};

export const cqAttemService = {
  createCqAttemps,
  updateCqAttemps,
  deleteCqAttemps,
  getAllCqAttemps,
};
