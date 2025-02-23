"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackModel = void 0;
const mongoose_1 = require("mongoose");
// Define Feedback Schema
const feedbackSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1-5
    comment: { type: String }, // Optional comment
}, { timestamps: true } // Adds createdAt and updatedAt
);
// Create Feedback Model
exports.feedbackModel = (0, mongoose_1.model)("Feedback", feedbackSchema);
