import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import ExamModel from "../exam/exam.model";
import { UserModel } from "../user/user.model";
import { IMcqQuestion } from "./mcq.interface";
import McqQuestion from "./mcq.model";
import QueryBuilder from "../../builder/querybuilder";

const createMcq = async (payload: IMcqQuestion) => {
  const exam = await ExamModel.findOne({ _id: payload.examId });

  const user = await UserModel.findOne({
    _id: payload.insertBy,
    isDeleted: false,
  });
  if (!exam || exam.examType !== "MCQ") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Invalid exam id or please check exam type. Only MCQ type exam needed",
    );
  } else if (!user || user.role === "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Invalid admin or teacher id.Only teacher and admin can cretae exam",
    );
  }

  payload.questionType = exam.examType;
  payload.positiveMark = exam.positiveMark;
  payload.negetiveMark = exam.negativeMark;

  const result = await McqQuestion.create(payload);
  return result;
};

const getAllMcq = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(McqQuestion, query)
    .search(["question", "explaination"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "examId",
      select: "examTitle slug examType positiveMark negativeMark status ",
      //   populate:{path:"courseId", select:"course_title description course_type price offerPrice"},
    })
    .populate([
      {
        path: "insertBy",
        select: "name role phone",
      },
    ]);
  const result = await courseQuery.exec();
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed  to get MCQ Question");
  }
  return result;
};

const getSingleMcq = async(_id:string) => {
  const result = await McqQuestion.findOne({_id}).populate({
      path: "examId",
      select: "examTitle slug examType positiveMark negativeMark status ",
      //   populate:{path:"courseId", select:"course_title description course_type price offerPrice"},
    })
    .populate([
      {
        path: "insertBy",
        select: "name role phone",
      },
    ]);
    return result
}

const updateMcq = async (_id: string, payload: IMcqQuestion) => {
  const mcq = await McqQuestion.findOne({ _id: _id });
  if (!mcq) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid mcq id");
  }

  const result = await McqQuestion.findOneAndUpdate({ _id }, payload, {
    runValidators: true,
    new: true,
  });
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to update mcq  question",
    );
  }
  return result;
};

const deleteMcq = async (_id: string) => {
  const mcq = await McqQuestion.findOne({ _id: _id });
  if (!mcq) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid mcq id");
  }

  const result = await McqQuestion.findOneAndUpdate(
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
      "Failed to delete mcq  question",
    );
  }
  return result;
};

const getSpcificMcq = async (id: string) => {
  const result = await McqQuestion.find({ examId: id, isDeleted: false })
    .populate("insertBy")
    .populate("examId");
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "exam id is not valid or not found in database",
    );
  }
  return result;
};

export const mcqQuestionService = {
  createMcq,
  getAllMcq,
  updateMcq,
  deleteMcq,
  getSpcificMcq,
  getSingleMcq
};
