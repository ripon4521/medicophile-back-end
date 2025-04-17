import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import ExamModel from "../exam/exam.model";
import { UserModel } from "../user/user.model";
import GapAttempModel from "./gapAttemp.model";

const getAllGapAttemp = async () => {
  const result = await GapAttempModel.find({ isDeleted: false });
  return result;
};

const getSpecificUserGapsAttempMark = async (
  studentId: string,
  examId: string,
) => {

  const student = await UserModel.findOne({_id:studentId});
  const exam = await ExamModel.findOne({_id:examId})
if (!student) {
  throw new AppError(StatusCodes.BAD_REQUEST, "invalid student id")
} else if (!exam) {
  throw new AppError(StatusCodes.BAD_REQUEST, "invalid exam id")
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
  };
};

export const gapAttempService = {
  getAllGapAttemp,
  getSpecificUserGapsAttempMark,
};
