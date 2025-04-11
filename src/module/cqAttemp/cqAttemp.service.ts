import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqAttemps } from "./cqAttemp.interface";
import CqAttempModel from "./cqAttemp.model";
import CqQuestionModel from "../classQuizeQuestion/classQuizeQuestion.model";
import mongoose from "mongoose";

const createCqAttemps = async (payload: ICqAttemps) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await CqAttempModel.create([payload], { session });
    const createdAttempt = result[0];

    const question = await CqQuestionModel.findOne(
      { _id: createdAttempt.questionId },
      null,
      { session },
    );

    if (!question) {
      throw new AppError(StatusCodes.NOT_FOUND, "Question not found");
    }

    let submissionStatus: "In Time" | "Late" = "In Time";
    if (
      question.durationDate &&
      createdAttempt.submittedTime > question.durationDate
    ) {
      submissionStatus = "Late";
    }

    // Update the submission status
    createdAttempt.submissionStatus = submissionStatus;
    await createdAttempt.save({ session });

    await session.commitTransaction();
    session.endSession();

    return createdAttempt;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllCqAttemps = async () => {
  const result = await CqAttempModel.find({ isDeleted: false })
    .populate("studentId")
    .populate("examId");
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
