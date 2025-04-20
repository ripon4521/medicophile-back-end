"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mcqQuestionSchema = new mongoose_1.Schema({
    examId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            validator: function (v) {
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
    insertBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    positiveMark: {
        type: Number
    }, negetiveMark: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }
});
// Create the Mongoose model
const McqQuestion = (0, mongoose_1.model)("McqQuestion", mcqQuestionSchema);
exports.default = McqQuestion;
