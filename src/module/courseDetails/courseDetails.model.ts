import { model, Schema } from "mongoose";
import { ICourseDetails, IFAQ } from "./courseDetails.interface";

// Reuse for syllabus and courseDetails
const faqSchema = new Schema<IFAQ>(
  {
    question: { type: String },
    answer: [{ type: String }],
  },
  { _id: false }
);

// Schema for isCourseExist item
const courseExistItemSchema = new Schema(
  {
    text: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const courseDetailsSchema = new Schema<ICourseDetails>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
    isCourseExist: [courseExistItemSchema], // updated here
    syllabus: [faqSchema],
    courseDetails: [faqSchema],
    instructors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  }
);

const CourseDetailsModel = model<ICourseDetails>(
  "CourseDetails",
  courseDetailsSchema
);

export default CourseDetailsModel;
