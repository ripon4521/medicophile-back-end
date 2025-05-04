import { Schema, model, Types } from "mongoose";
import { ICourseReview } from "./courseReview.interface";

const courseReviewSchema = new Schema<ICourseReview>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  },
);

const CourseReviewModel = model<ICourseReview>(
  "CourseReview",
  courseReviewSchema,
);
export default CourseReviewModel;
