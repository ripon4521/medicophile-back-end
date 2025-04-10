import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { IGapAnswer } from "./gapAnswer.interface";
import GapAnswerModel from "./gapAnswer.model";
import GapsQuestionModel from "../gapsQuestion/gapsQuestion.model";
import GapAttempModel from "../gapsAttemp/gapAttemp.model";


import mongoose from 'mongoose';

const cretaeGapsAnswer = async (payload:any) => {
  const session = await mongoose.startSession();  
  session.startTransaction();  

  try {

    const submissionDate = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); 


    const result = await GapAnswerModel.create([payload], { session });
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create Gaps Answer. Please check and try again");
    }

    // Fetch the question from the database
    const question = await GapsQuestionModel.findOne({ _id: result[0].questionId, examId: result[0].examId }).session(session);

    if (!question) {
      throw new AppError(StatusCodes.NOT_FOUND, "Question not found.");
    }

    // Check if the answer is correct
    const isCorrect = question?.answer?.includes(result[0].answer);

    // Find existing attempt or create a new one
    let attempt = await GapAttempModel.findOne({ studentId: result[0]?.studentId, examId: result[0]?.examId }).session(session);

    const score = isCorrect ? question?.mark : 0;

    // result.durationDate should be the deadline
const durationTime = await GapsQuestionModel.findOne({_id:result[0].questionId}).session(session);
// console.log(durationTime)


let submissionStatus: "In Time" | "Late" = "In Time";

if (durationTime?.durationDate && submissionDate > durationTime?.durationDate) {
  submissionStatus = "Late";
} else {
  submissionStatus = "In Time";
}

    // Create or update the attempt record
    if (!attempt) {
      attempt = new GapAttempModel({
        studentId: result[0]?.studentId,
        examId: result[0]?.examId,
        questionId:result[0]?.questionId,
        score: score,
        totalMarks: score,
        submittedTime: submissionDate,
        submissionStatus: submissionStatus,
        attemptedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        isDeleted: false,
        deletedAt: null
      });
    } else {
      attempt.score += score;
      attempt.totalMarks += score;  // Adjust this logic if needed
      attempt.submittedTime = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
      attempt.submissionStatus = submissionStatus;
      
    }

    // Save the attempt record
    await attempt.save({ session });

    // Commit the transaction if all operations are successful
    await session.commitTransaction();
    session.endSession();  // End the session

    // Return the created gap answer
    return result[0];  // Since result is an array due to `create([payload])`
  } catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();  // End the session

    // Re-throw the error to handle it elsewhere
    throw error;
  }
};

const getAllGapsAnswer = async(query: Record<string, unknown>) => {
 const result = await GapAnswerModel.find({isDeleted:false}).populate('examId').populate('questionId')
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to get Gaps Answer. Please check and try again")
}
  return result;
   
}



const updateGapsAnser = async(_id:string,payload:IGapAnswer) => {
    const result = await GapAnswerModel.findOneAndUpdate({_id}, payload, {
        runValidators:true,
        new:true
    });
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update gaps answer. Please check id and try again")
    }
    return result;
}


const deleteGapsAnswer = async(_id:string) => {
    const result = await GapAnswerModel.findOneAndUpdate({_id}, {
        isDeleted:true,
        deletedAt:new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },{
        new:true
    } )
      
    if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete gaps answer. Please check id and try again")
    }
    return result;
}


export const gapsAnserService = {
    cretaeGapsAnswer,
    deleteGapsAnswer,
    getAllGapsAnswer,
    updateGapsAnser
}