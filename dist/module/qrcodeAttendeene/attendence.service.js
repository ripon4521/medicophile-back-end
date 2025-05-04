"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendeceService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const batchStudent_model_1 = require("../batchStudent/batchStudent.model");
const attendence_model_1 = __importDefault(require("./attendence.model")); // মডেল ইম্পোর্ট করো
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createAttendence = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield batchStudent_model_1.BatchStudentModel.findOne({ studentId });
    console.log(student);
    if (!student) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Student not found this batch.");
    }
    const batchStudent = student._id;
    const today = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const existingAttendance = yield attendence_model_1.default.findOne({
        studentId,
        batchStudent,
        insertTime: { $gte: startOfDay, $lte: endOfDay },
    });
    if (existingAttendance) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Attendance for this student in the same batch already exists for today.");
    }
    const newAttendance = new attendence_model_1.default({
        studentId,
        batchStudent,
        insertTime: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        isDeleted: false,
    });
    yield newAttendance.save();
    return newAttendance;
});
const getAllAttendance = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(attendence_model_1.default, query)
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
<<<<<<< HEAD
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
=======
        .populate([{ path: "studentId", select: "name role phone profile_picture" },
>>>>>>> 893945e (Resolved merge conflicts)
    ]);
    const result = yield courseQuery.exec();
    return result;
});
const deleteAttendance = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield attendence_model_1.default.findOneAndDelete({ _id });
    return result;
});
const singleAttendance = (_id) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const result = yield attendence_model_1.default.findOne({ _id })
        .populate([
=======
    const result = yield attendence_model_1.default.findOne({ _id }).populate([
>>>>>>> 893945e (Resolved merge conflicts)
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
<<<<<<< HEAD
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
=======
        .populate([{ path: "studentId", select: "name role phone profile_picture" },
>>>>>>> 893945e (Resolved merge conflicts)
    ]);
    return result;
});
exports.attendeceService = {
    createAttendence,
    getAllAttendance,
    deleteAttendance,
<<<<<<< HEAD
    singleAttendance,
=======
    singleAttendance
>>>>>>> 893945e (Resolved merge conflicts)
};
