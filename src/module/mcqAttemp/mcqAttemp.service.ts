import { Types } from "mongoose";
import { IMcqAttemp } from "./mcqAttemp.interface";
import McqQuestion from "../mcq/mcq.model";
import McqAttemptModel from "./mcqAttemp.model";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import QueryBuilder from "../../builder/querybuilder";

const submitAttemptService = async ({ studentId, answer }: IMcqAttemp) => {
  const user = await UserModel.findOne({ _id: studentId });
  if (!user || user.role !== "student") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "invalid student id. Please provide a valid student id",
    );
  }

  const questionIds = answer.map((a) => new Types.ObjectId(a.questionId));

  // Fetch all answered questions and populate examId
  const questions = await McqQuestion.find({
    _id: { $in: questionIds },
  }).populate("examId"); // To access positiveMark, negativeMark, and examId

  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let examId: Types.ObjectId | null = null;

  // Process each answer
  for (const userAnswer of answer) {
    const matchedQuestion = questions.find(
      (q) => q._id.toString() === userAnswer.questionId.toString(),
    );

    if (!matchedQuestion || !matchedQuestion.examId) continue;

    // Set the examId from the first matched question
    if (!examId) {
      examId = matchedQuestion.examId;
    }

    const positiveMark = matchedQuestion.positiveMark || 1;
    const negativeMark = matchedQuestion.negetiveMark || 0;

    // Check if the answer is correct
    if (matchedQuestion.correctAnswer === userAnswer.selectedAnswer) {
      score += positiveMark;
      correctCount++;
    } else {
      score -= negativeMark;
      wrongCount++;
    }
  }

  const total = answer.length;

  // Save result with examId
  const result = await McqAttemptModel.create({
    studentId: new Types.ObjectId(studentId),
    examId, 
    answer,
    score,
    total,
    correctCount,
    wrongCount,
  });

  return {
    message: "Exam submitted successfully!",
    score,
    correctCount,
    wrongCount,
    total,
    examId,
    attempt: result,
  };
};

const getAllMcq = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(McqAttemptModel, query)
    .search(["totalScore"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: "studentId",
      select: "name role phone",
    })
    .populate({
      path: "examId",
    })
  

  const result = await courseQuery.exec(); 
  return result;
};

const getSpcificMcqAttemp = async (id: string) => {
  const result = await McqAttemptModel.find({ studentId: id }).populate(
    "studentId",
  );
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "studnt id is not valid or not found in database",
    );
  }
  return result;
};

export const mcqAttempService = {
  submitAttemptService,
  getSpcificMcqAttemp,
  getAllMcq,
};
