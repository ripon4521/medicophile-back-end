import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from '../module/student/student.interface';
import { UserModel } from '../module/user/user.model';
import AppError from '../helpers/AppError';
import { sendSMS } from './sendSms';
import studentModel from '../module/student/student.model';
import { IUser } from '../module/user/user.interface';


export const createStudentWithUser = async (payload: IStudent) => {
  const isExist = await UserModel.findOne({ phone: payload.phone, isDeleted: false });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user already exists. Please login.");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Generate random 6-digit password
    const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();

    // Step 2: Send SMS
    const sms = await sendSMS(payload.phone, `Your login password is: ${plainPassword}`);
    if (!sms) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Student creation failed while sending SMS.");
    }

    // Step 3: Create student (without userId)
    const studentData = { ...payload };
    const createdStudent = await studentModel.create([studentData], { session });

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Step 5: Create user
    const userData: Partial<IUser> = {
      name: createdStudent[0].name,
      status: createdStudent[0].status,
      role: createdStudent[0].role,
      profile_picture: createdStudent[0].profile_picture,
      phone: createdStudent[0].phone,
      password: hashedPassword,
      email: createdStudent[0].email,
      isDeleted: createdStudent[0].isDeleted,
      deletedAt: createdStudent[0].deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });

    // Step 6: Update student with userId
    await studentModel.updateOne(
      { _id: createdStudent[0]._id },
      { userId: newUser[0]._id },
      { session }
    );

    // Commit and end session
    await session.commitTransaction();
    session.endSession();

    return {
      student: createdStudent[0],
      user: newUser[0],
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + (error instanceof Error ? error.message : error));
  }
};
