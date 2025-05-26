import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IGapAnswer } from "./gapAnswer.interface";
import GapAnswerModel from "./gapAnswer.model";
import GapsQuestionModel from "../gapsQuestion/gapsQuestion.model";
import GapAttempModel from "../gapsAttemp/gapAttemp.model";

import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import ExamModel from "../exam/exam.model";

const cretaeGapsAnswer = async (payload: any) => {
  const user = await UserModel.findOne({ _id: payload.studentId });
  const exam = await ExamModel.findOne({ _id: payload.examId });
  const question = await GapsQuestionModel.findOne({ _id: payload.questionId });

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid user id");
  } else if (!exam) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid exam id");
  } else if (!question) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid question id");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const submissionDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);

    const isWithinValidTime = exam.validTime
      ? new Date(submissionDate).getTime() <= new Date(exam.validTime).getTime()
      : true; // যদি validTime না থাকে, তাহলে সবসময় true

    const isCorrect = question?.answer?.includes(payload.answer);
    const score = isCorrect ? question?.mark : 0;

    const answerData = {
      ...payload,
      isCorrect,
      score,
      totalMarks: score,
      submittedTime: submissionDate,
      createdAt: submissionDate,
    };

    if (isWithinValidTime) {
      const result = await GapAnswerModel.create([payload], { session });

      if (!result || result.length === 0) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "Failed to create Gaps Answer. Please check and try again"
        );
      }

      let attempt = await GapAttempModel.findOne({
        studentId: result[0]?.studentId,
        examId: result[0]?.examId,
      }).session(session);

      if (!attempt) {
        attempt = new GapAttempModel({
          studentId: result[0]?.studentId,
          examId: result[0]?.examId,
          questionId: result[0]?.questionId,
          score,
          totalMarks: score,
          submittedTime: submissionDate,
          attemptedAt: submissionDate,
          isDeleted: false,
        });
      } else {
        attempt.score += score;
        attempt.totalMarks += score;
        attempt.submittedTime = submissionDate;
      }

      await attempt.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        ...result[0],
        isCorrect,
        score,
        totalMarks: attempt.totalMarks,
      };
    } else {
      await session.abortTransaction();
      session.endSession();

      return {
        ...answerData,
        notSaved: true,
        message: "Valid submission time is over. Answer not saved in database.",
      };
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getAllGapsAnswer = async (query: Record<string, unknown>) => {
  const result = await GapAnswerModel.find({ isDeleted: false })
    .populate("examId")
    .populate("questionId");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Gaps Answer. Please check and try again",
    );
  }
  return result;
};

const updateGapsAnser = async (_id: string, payload: IGapAnswer) => {
  const result = await GapAnswerModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update gaps answer. Please check id and try again",
    );
  }
  return result;
};

const deleteGapsAnswer = async (_id: string) => {
  const result = await GapAnswerModel.findOneAndUpdate(
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
      "Failed to delete gaps answer. Please check id and try again",
    );
  }
  return result;
};

export const gapsAnserService = {
  cretaeGapsAnswer,
  deleteGapsAnswer,
  getAllGapsAnswer,
  updateGapsAnser,
};
