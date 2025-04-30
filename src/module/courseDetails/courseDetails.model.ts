
import { model, Schema } from "mongoose";
import { ICourseDetails, IFAQ } from "./courseDetails.interface";


const faqSchema = new Schema<IFAQ>(
    {
      question: { type: String, required: true },
      answer: [{ type: String, required: true }],
    },
    { _id: false }
  );
  
  const courseDetailsSchema = new Schema<ICourseDetails>(
    {
      isCourseExist: [{ type: String, required: true }],
      syllabus: [faqSchema],
      courseDetails: [faqSchema],
      instructors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      isDeleted:{type:Boolean, default:false},
      deletedAt:{type:Date}
    },
    {
        timestamps: {
          currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        },
      },
  );
  
  const CourseDetailsModel = model<ICourseDetails>("CourseDetails", courseDetailsSchema);
  
  export default CourseDetailsModel;