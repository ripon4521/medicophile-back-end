import mongoose, { Schema } from "mongoose";
import { IGapAttemp } from "./gapAttemp.interface";


const gapAttempSchema = new Schema<IGapAttemp>({
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',  
    },
    examId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Exam',  
    },
    score: {
      type: Number,
      required: true,
      min: 0, 
      max: 100,  
    },
    totalMarks: {
      type: Number,
   
     
    },
    submissionStatus: {
      type: String,
      enum: ['In Time', 'Late'],  
      required: true,
    },

    attemptedAt: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
   
      default: false,
    },
    deletedAt: {
      type: Date,
    
    },
  },{
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    },
  });

  const GapAttempModel = mongoose.model<IGapAttemp>('GapAttemp', gapAttempSchema);

export default GapAttempModel;