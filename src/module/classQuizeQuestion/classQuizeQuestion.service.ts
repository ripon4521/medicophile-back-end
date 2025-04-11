import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqQuestion } from "./classQuizeQuestion.interface";
import CqQuestionModel from "./classQuizeQuestion.model";
import QueryBuilder from "../../builder/querybuilder";

const createCqQuestion = async (payload: ICqQuestion) => {
  const result = await CqQuestionModel.create(payload);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create CQ Question, Please check and try again",
    );
  }
  return result;
};

const getALlCqQuestion = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CqQuestionModel, query)
    .search(["question"])
    .populate({
      path: "examId",
      populate: [{ path: "courseId" }, { path: "moduleId" }],
    })
    .populate(["createdBy"]);

  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to get Cq Question data. Please check your qury and try again. Query only question filed",
    );
  }
  return result;
};

const updateCqQuestion = async (_id: string, payload: ICqQuestion) => {
  const update = await CqQuestionModel.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!update) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to  update Cq Question , Please check and try again",
    );
  }
  return update;
};

const deleteCqQuestion = async (_id: string) => {
  const result = await CqQuestionModel.findOneAndUpdate(
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
      "Failed to delete Cq Question. Please check and try again",
    );
  }
  return result;
};

export const cqQuestionService = {
  createCqQuestion,
  updateCqQuestion,
  deleteCqQuestion,
  getALlCqQuestion,
};
