import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from '../module/student/student.interface';
import { UserModel } from '../module/user/user.model';
import AppError from '../helpers/AppError';
import { sendSMS } from './sendSms';
import studentModel from '../module/student/student.model';
import { IUser } from '../module/user/user.interface';


export const createStudentWithUser = async (payload: IStudent, externalSession?: mongoose.ClientSession) => {
  const isExist = await UserModel.findOne({ phone: payload.phone, isDeleted: false });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user already exists. Please login.");
  }

  const session = externalSession || await mongoose.startSession();
  const isNewSession = !externalSession;

  if (isNewSession) session.startTransaction();

  try {
    const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();

    const sms = await sendSMS(payload.phone, `আপনার কোর্সটি পার্চেস হয়েছে। 
লগ ইন করতে আপনার ফোন নাম্বার এবং এই ${plainPassword} পাসওয়ার্ড দিয়ে লগ ইন করুন।`);
    if (!sms) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Student creation failed while sending SMS.");
    }

    const studentData = { ...payload };
    const createdStudent = await studentModel.create([studentData], { session });

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

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

    await studentModel.updateOne(
      { _id: createdStudent[0]._id },
      { userId: newUser[0]._id },
      { session }
    );

    if (isNewSession) {
      await session.commitTransaction();
      session.endSession();
    }

    return {
      student: createdStudent[0],
      user: newUser[0],
    };
  } catch (error) {
    if (isNewSession) {
      await session.abortTransaction();
      session.endSession();
    }
    throw new Error("Transaction failed: " + (error instanceof Error ? error.message : error));
  }
};

