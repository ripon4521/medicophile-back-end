import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';
import { IEnrollment } from './newEnrollment.interface';

// Define the Mongoose schema
const EnrollmentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Students', 
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course', 
    },
    paidAmont: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cash', 'bikash', 'nagad', 'roket'],
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'blocked'],
      default:'blocked'
    },
    transctionId:{
        type:String
    },
    paymentNumber:{
        type:String
    }
  },
  { timestamps: true } 
);

// Create a Mongoose model from the schema
const enrollMentModel = mongoose.model<IEnrollment & Document>('Enrollments', EnrollmentSchema);

export default enrollMentModel;
