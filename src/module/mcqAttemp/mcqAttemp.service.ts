import { Types } from "mongoose";
import { IMcqAttemp } from "./mcqAttemp.interface";
import McqQuestion from "../mcq/mcq.model";
import McqAttemptModel from "./mcqAttemp.model";



const submitAttemptService = async ({ studentId, answer }: IMcqAttemp) => {
    const questionIds = answer.map(a => new Types.ObjectId(a.questionId));
  
    // Fetch all answered questions and populate examId
    const questions = await McqQuestion.find({
      _id: { $in: questionIds }
    }).populate("examId"); // To access positiveMark and negativeMark
  
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
  
    // Process each answer
    for (const userAnswer of answer) {
      const matchedQuestion = questions.find(
        q => q._id.toString() === userAnswer.questionId.toString()
      );
  
      if (!matchedQuestion || !matchedQuestion.examId) continue;
  
      const positiveMark = matchedQuestion.positiveMark || 1;
      const negativeMark = matchedQuestion.negetiveMark || 0;
  
      // Check if answer is correct
      if (matchedQuestion.correctAnswer === userAnswer.selectedAnswer) {
        score += positiveMark;
        correctCount++;
      } else {
        score -= negativeMark;
        wrongCount++;
      }
    }
  
    const total = answer.length;
  
    // Save result
    const result = await McqAttemptModel.create({
      studentId: new Types.ObjectId(studentId),
      answer,
      score,
      total,
      correctCount,
      wrongCount
    });
  
    return {
      message: "Exam submitted successfully!",
      score,
      correctCount,
      wrongCount,
      total,
      attempt: result
    };
  };
  
  
export const mcqAttempService = {
    submitAttemptService
}  
