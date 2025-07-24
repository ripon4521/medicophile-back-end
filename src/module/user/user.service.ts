import mongoose from "mongoose";
import { UserModel } from "./user.model";
import { IUser } from "./user.interface";
// import StudentUserModel from "../student/student.model";
import FacultyUserModel from "../teacher/faculty.model";
// import { IStudent } from "../student/student.interface";
import { IFaculty } from "../teacher/faculty.interface";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";
import { IStudent } from "../student/student.interface";
import studentModel from "../student/student.model";
import { IAdmin } from "../admin/admin.interface";
import adminModel from "../admin/admin.model";
import bcrypt from "bcrypt";
import { sendSMS } from "../../utils/sendSms";
import { IChangePasswordPayload } from "./changepassord.interface";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/querybuilder";
import shopManagerModel from "../accountent/accounttent.model";
import { IShopManager } from "../accountent/accountent.interface";


const createStudentsIntoDB = async (payload: IStudent) => {
  const isExist = await UserModel.findOne({phone:payload.phone, isDeleted:false});
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user already exist.Please login")
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const studentData = { ...payload };
    const createdStudent = await studentModel.create([studentData], {
      session,
    });
    const hashedPassword = await bcrypt.hash(payload.password, 12);
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
      { session },
    );
    await session.commitTransaction();
    session.endSession();
    return {
      student: createdStudent[0],
      user: newUser[0],
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};



const createAdmiIntoDB = async (payload: IAdmin) => {
  const isExist = await UserModel.findOne({phone:payload.phone, isDeleted:false});
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user already exist.Please login")
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const adminData = { ...payload };
    const createdAdmin = await adminModel.create([adminData], { session });
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userData: Partial<IUser> = {
      name: createdAdmin[0]?.name,
      status: createdAdmin[0]?.status,
      role: createdAdmin[0]?.role,
      profile_picture: createdAdmin[0]?.profile_picture,
      phone: createdAdmin[0]?.phone,
      password: hashedPassword,
      email: createdAdmin[0]?.email,
      isDeleted: createdAdmin[0]?.isDeleted,
      deletedAt: createdAdmin[0]?.deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });
    await adminModel.updateOne(
      { _id: createdAdmin[0]._id },
      { userId: newUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();
    return { admin: createdAdmin[0], user: newUser[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};



const createFacultysIntoDB = async (payload: IFaculty) => {
  const isExist = await UserModel.findOne({phone:payload.phone, isDeleted:false});
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This user already exist.Please login")
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const faculty = { ...payload };
    const createdFaculty = await FacultyUserModel.create([faculty], {
      session,
    });
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const userData: Partial<IUser> = {
      name: createdFaculty[0]?.name,
      status: createdFaculty[0]?.status,
      role: createdFaculty[0]?.role,
      profile_picture: createdFaculty[0]?.profile_picture,
      phone: createdFaculty[0]?.phone,
      password: hashedPassword,
      email: createdFaculty[0]?.email,
      isDeleted: createdFaculty[0]?.isDeleted,
      deletedAt: createdFaculty[0]?.deletedAt,
    };
    const newUser = await UserModel.create([userData], { session });
    await FacultyUserModel.updateOne(
      { _id: createdFaculty[0]._id },
      { userId: newUser[0]._id },
      { session },
    );
    await session.commitTransaction();
    session.endSession();
    return { admin: createdFaculty[0], user: newUser[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Transaction failed: " + error);
  }
};



const createShopManagerIntoDB = async (payload: IShopManager) => {
  const isExist = await UserModel.findOne({
    phone: payload.phone,
    isDeleted: false,
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This user already exists. Please login',
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Prepare plain password
    const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();

    // Step 2: Send SMS
    const sms = await sendSMS(
      payload.phone,
      `Welcome To ICON Admission Aid!  Your login password is: ${plainPassword} (Please do not share this Password with others)`,
    );

    if (!sms) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Shop Manager creation failed. SMS credit ended.',
      );
    }

    // Step 3: Create shop manager (admin)
    const shopmanagerData = { ...payload };
    const createdAdmin = await shopManagerModel.create([shopmanagerData], { session });

    // Step 4: Hash password and create user
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    const userData: Partial<IUser> = {
      name: createdAdmin[0]?.name,
      status: createdAdmin[0]?.status,
      role: createdAdmin[0]?.role,
      profile_picture: createdAdmin[0]?.profile_picture,
      phone: createdAdmin[0]?.phone,
      password: hashedPassword,
      email: createdAdmin[0]?.email,
      isDeleted: createdAdmin[0]?.isDeleted,
      deletedAt: createdAdmin[0]?.deletedAt,
    };

    const newUser = await UserModel.create([userData], { session });

    // Step 5: Update shop manager with userId
    await shopManagerModel.updateOne(
      { _id: createdAdmin[0]._id },
      { userId: newUser[0]._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return { admin: createdAdmin[0], user: newUser[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Transaction failed: ' + (error as Error).message);
  }
};

const changePassword = async (
  payload: IChangePasswordPayload,
): Promise<string> => {
  const { phone, oldPassword, newPassord, confrimPassord } = payload;

  // Basic validation
  if (!phone || !oldPassword || !newPassord || !confrimPassord) {
    throw new AppError(httpStatus.BAD_REQUEST, "All fields are required");
  }

  const user = await UserModel.findOne({ phone, isDeleted: false });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found with this phone number",
    );
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  if (newPassord !== confrimPassord) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "New password and confirm password do not match",
    );
  }

  const hashedPassword = await bcrypt.hash(newPassord, 12);
  user.password = hashedPassword;
  await user.save();

  return "Password changed successfully";
};


const getUSers = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(UserModel, query)
    .search(["name", "role"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.exec();
  return result;
};

const deleteUser = async () => {
  const result = await UserModel.deleteMany();
  return result;
};

const getPofile = async (phone: string) => {
  if (!phone)
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "phone number is required to fetch profile.",
    );

  const result = await UserModel.findOne({ phone });
  if (!result) throw new AppError(StatusCodes.FORBIDDEN, "User not found.");

  return result;
};

export const userService = {
  createFacultysIntoDB,
  createStudentsIntoDB,
  getUSers,
  deleteUser,
  getPofile,
  createAdmiIntoDB,
  changePassword,
  createShopManagerIntoDB
};
