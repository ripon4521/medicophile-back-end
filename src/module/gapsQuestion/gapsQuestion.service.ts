import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IGapsQuestion } from "./gapsQuestion.interface";
import GapsQuestionModel from "./gapsQuestion.model";
import QueryBuilder from "../../builder/querybuilder";

const cretaeGapsQuestion = async (payload: IGapsQuestion) => {
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
    .paginate()
    .populate(["examId"])
    .populate(["createdBy"]);

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

export const gapsQuestionService = {
  cretaeGapsQuestion,
  getAllGapsQuestion,
  updateGapsQuestion,
  deleteGapsQuestion,
};
