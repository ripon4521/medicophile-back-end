"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GapsQuestionSchema = new mongoose_1.Schema(
  {
    examId: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: { type: String, required: true },
    duration: { type: Number, required: true },
    mark: { type: Number, required: true, default: 1 },
    answer: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);
const GapsQuestionModel = (0, mongoose_1.model)(
  "GapsQuestion",
  GapsQuestionSchema,
);
exports.default = GapsQuestionModel;
