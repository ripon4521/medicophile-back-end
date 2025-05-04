import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import ExamModel from "../exam/exam.model";
import { UserModel } from "../user/user.model";
import GapAttempModel from "./gapAttemp.model";
import QueryBuilder from "../../builder/querybuilder";

const getAllGapAttemp = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(GapAttempModel, query)
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

const getSpecificUserGapsAttempMark = async (
  studentId: string,
  examId: string,
) => {
  const student = await UserModel.findOne({ _id: studentId });
  const exam = await ExamModel.findOne({ _id: examId });
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id");
  } else if (!exam) {
    throw new AppError(StatusCodes.BAD_REQUEST, "invalid exam id");
  }

  const result = await GapAttempModel.find({
    studentId,
    examId,
    isDeleted: false,
  });

  // Check what data you're getting
  console.log("Result:", result);

  const totalScore = result.reduce((sum, attempt) => {
    return (
      sum +
      (typeof attempt.score === "number"
        ? attempt.score
        : parseFloat(attempt.score || "0"))
    );
  }, 0);

  console.log("Total Score:", totalScore);

  return {
    totalScore,
    result,
  };
};

export const gapAttempService = {
  getAllGapAttemp,
  getSpecificUserGapsAttempMark,
};
