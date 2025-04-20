import { Schema, model, Types } from "mongoose";

const mcqQuestionSchema = new Schema(
  {
    examId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Exam", 
    },
    question: {
      type: String,
      required: true,
    },
    questionImg: {
      type: String,
      required: false,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length >= 2;
        },
        message: "There must be at least two options",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    explaination: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    questionType: {
      type: String,
      required: false,
    },
    questionCategory: {
      type: String,
      required: false,
    },
    insertBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User", 
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }
  },
);

// Create the Mongoose model
const McqQuestion = model("McqQuestion", mcqQuestionSchema);

export default McqQuestion;
