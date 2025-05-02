import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ICqQuestion } from "./classQuizeQuestion.interface";
import CqQuestionModel from "./classQuizeQuestion.model";
import QueryBuilder from "../../builder/querybuilder";
import { UserModel } from "../user/user.model";
import ExamModel from "../exam/exam.model";

const createCqQuestion = async (payload: ICqQuestion) => {
  const user = await UserModel.findOne({ _id: payload.createdBy });
  const exam = await ExamModel.findOne({ _id: payload.examId });
  if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid user id , only admin and teacher create cq question",
    );
  }
  if (!exam || exam.examType !== "CQ") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid exam id. Only cq type exam needed",
    );
  }

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
    .filter()
    .fields()
    .sort()
    .fields()
    .paginate()
    .populate({
      path: "examId",
      select:
        "examTitle examType totalQuestion positiveMark negativeMark mcqDuration cqMark slug status",
      populate: [
        {
          path: "courseId",
          select:
            "cover_photo course_title description duration course_type expireTime slug price offerPrice",
        },
        { path: "moduleId", select: "moduleTitle slug" },
      ],
    })
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

const getSpcificCq = async (id: string) => {
  const result = await CqQuestionModel.find({ examId: id, isDeleted: false })
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


const getSingleQuestion = async (_id: string) => {
  const result = await CqQuestionModel.findOne({_id }).populate("examId").populate("createdBy")
  return result;
};

export const cqQuestionService = {
  createCqQuestion,
  updateCqQuestion,
  deleteCqQuestion,
  getALlCqQuestion,
  getSpcificCq,
  getSingleQuestion
};
