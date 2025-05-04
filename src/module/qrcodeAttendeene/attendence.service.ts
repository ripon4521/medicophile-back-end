import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { BatchStudentModel } from "../batchStudent/batchStudent.model";
import Attendence from "./attendence.model"; // মডেল ইম্পোর্ট করো
import QueryBuilder from "../../builder/querybuilder";

const createAttendence = async (studentId: string) => {
  const student = await BatchStudentModel.findOne({ studentId });
  console.log(student);
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, "Student not found this batch.");
  }
  const batchStudent = student._id;
  const today = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const existingAttendance = await Attendence.findOne({
    studentId,
    batchStudent,
    insertTime: { $gte: startOfDay, $lte: endOfDay },
  });

  if (existingAttendance) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Attendance for this student in the same batch already exists for today.",
    );
  }

  const newAttendance = new Attendence({
    studentId,
    batchStudent,
    insertTime: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    isDeleted: false,
  });

  await newAttendance.save();

  return newAttendance;
};

const getAllAttendance = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Attendence, query)
    .search(["studentId"])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate([
      {
        path: "batchStudent",
        populate: [
          {
            path: "courseId",
            select: "course_title",
          },
          {
            path: "batchId",
            select: "name",
          },
        ],
        select: "batchId courseId studentId",
      },
    ])
    .populate([
      { path: "studentId", select: "name role phone profile_picture" },
    ]);
  const result = await courseQuery.exec();
  return result;
};

const deleteAttendance = async (_id: string) => {
  const result = await Attendence.findOneAndDelete({ _id });
  return result;
};

const singleAttendance = async (_id: string) => {
  const result = await Attendence.findOne({ _id })
    .populate([
      {
        path: "batchStudent",
        populate: [
          {
            path: "courseId",
            select: "course_title",
          },
          {
            path: "batchId",
            select: "name",
          },
        ],
        select: "batchId courseId studentId",
      },
    ])
    .populate([
      { path: "studentId", select: "name role phone profile_picture" },
    ]);
  return result;
};

export const attendeceService = {
  createAttendence,
  getAllAttendance,
  deleteAttendance,
  singleAttendance,
};
