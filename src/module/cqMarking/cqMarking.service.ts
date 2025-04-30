import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqMarking } from "./cqMarking.interface";
import CqMarkingModel from "./cqMarking.model";
import { UserModel } from "../user/user.model";
import ExamModel from "../exam/exam.model";
import CqQuestionModel from "../classQuizeQuestion/classQuizeQuestion.model";
import QueryBuilder from "../../builder/querybuilder";

const createCqMarking = async (payload: ICqMarking) => {
  const student = await UserModel.findOne({ _id: payload.studentId });
  const exam = await ExamModel.findOne({ _id: payload.examId });
  const question = await CqQuestionModel.findOne({ _id: payload.questionId });
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid student id.");
  } else if (!exam) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid exam id");
  } else if (!question) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid question id");
  }

  const result = await CqMarkingModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create Cq Marking. Please cheack and try again",
    );
  }
  return result;
};

const getAllCqMarking = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CqMarkingModel, query)
    .search(["score"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "studentId",
      select: "name role phone",
    })
    .populate([
      {
        path: "examId",
        select: "examTitle rolexamTypee examType",
      },
    ])
    .populate([
      {
        path: "questionId",
        select: "question",
      },
    ]);
  const result = await courseQuery.exec();
  return result;
};

const getSpecifUserCqMarking = async (
  studentId: string,
  examId: string,
  questionId: string,
) => {
  const user = await UserModel.findOne({ _id: studentId });
  const exam = await ExamModel.findOne({ _id: examId });
  const question = await CqQuestionModel.findOne({ _id: questionId });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid student id");
  } else if (!exam) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid exam id");
  } else if (!question) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid question id");
  }

  const result = await CqMarkingModel.find({
    studentId: studentId,
    examId: examId,
    questionId: questionId,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Specefic Cq Marking. Please cheack and try again",
    );
  }
  return result;
};

const updateCqMarking = async (_id: string, payload: ICqMarking) => {
  const check = await CqMarkingModel.findOne({ _id: _id });
  if (!check) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid cq marking id");
  }
  const update = await CqMarkingModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update Cq Marking. Please cheack and try again",
    );
  }
  return update;
};

const deleteCqMarking = async (_id: string) => {
  const check = await CqMarkingModel.findOne({ _id: _id });
  if (!check) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid cq marking id");
  }
  const update = await CqMarkingModel.findOneAndUpdate(
    { _id },
    {
      isDeleted: true,
      deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
    {
      runValidators: true,
      new: true,
    },
  );
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to delete Cq Marking. Please cheack and try again",
    );
  }
  return update;
};

export const cqMarkingService = {
  createCqMarking,
  deleteCqMarking,
  updateCqMarking,
  getAllCqMarking,
  getSpecifUserCqMarking,
};
