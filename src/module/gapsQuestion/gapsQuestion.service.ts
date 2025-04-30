import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IGapsQuestion } from "./gapsQuestion.interface";
import GapsQuestionModel from "./gapsQuestion.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";
import ExamModel from "../exam/exam.model";

const cretaeGapsQuestion = async (payload: IGapsQuestion) => {
  const user = await UserModel.findOne({ _id: payload.createdBy });
  const exam = await ExamModel.findOne({ _id: payload.examId });
  if (!exam || exam.examType !== "Fill in the gaps") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid exam id.Please provide a valid exam id",
    );
  } else if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id. only admin and teacer create gap question",
    );
  }
  const result = await GapsQuestionModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create Gaps Question. Please check and try again",
    );
  }
  return result;
};

const getAllGapsQuestion = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(GapsQuestionModel, query)
    .search(["question", "answer"])
    .fields()
    .filter()
    .sort()
    .paginate()
    .populate([
      {
        path: "examId",
        select: "examTitle examType validTime scheduleDate courseId moduleId ",
      },
    ])
    .populate([
      {
        path: "createdBy",
        select: "name role phone",
      },
    ]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Gaps Questions. Please check and try again",
    );
  }
  return result;
};

const updateGapsQuestion = async (_id: string, payload: IGapsQuestion) => {
  const gap = await GapsQuestionModel.findOne({ _id: _id });
  if (!gap) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid gap id");
  }
  const result = await GapsQuestionModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update gaps question. Please check id and try again",
    );
  }
  return result;
};

const deleteGapsQuestion = async (_id: string) => {
  const gap = await GapsQuestionModel.findOne({ _id: _id });
  if (!gap) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid gap id");
  }
  const result = await GapsQuestionModel.findOneAndUpdate(
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
      "Failed to delete gaps question. Please check id and try again",
    );
  }
  return result;
};


const getSpcificGaps = async (id: string) => {
    const result = await GapsQuestionModel.find({examId:id, isDeleted:false})
      .populate("createdBy")
      .populate("examId");
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "exam id is not valid or not found in database",
      );
    }
    return result;
  };

export const gapsQuestionService = {
  cretaeGapsQuestion,
  getAllGapsQuestion,
  updateGapsQuestion,
  deleteGapsQuestion,
  getSpcificGaps
};
