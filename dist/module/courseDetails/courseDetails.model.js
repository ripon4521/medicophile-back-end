"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: [{ type: String, required: true }],
}, { _id: false });
const courseDetailsSchema = new mongoose_1.Schema({
    courseId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Course" },
    isCourseExist: [{ type: String, required: true }],
    syllabus: [faqSchema],
    courseDetails: [faqSchema],
    instructors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, {
    timestamps: {
        currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
});
const CourseDetailsModel = (0, mongoose_1.model)("CourseDetails", courseDetailsSchema);
exports.default = CourseDetailsModel;
