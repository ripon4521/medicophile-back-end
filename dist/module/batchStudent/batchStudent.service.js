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
exports.batchStudentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const batchStudent_model_1 = require("./batchStudent.model");
const querybuilder_1 = __importDefault(require("../../builder/querybuilder"));
const createBatchStudent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ _id: payload.studentId });
    if (!user || user.role !== "student") {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid user id.");
    }
    const result = yield batchStudent_model_1.BatchStudentModel.create(payload);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create  .  try again");
    }
    return result;
});
const getAllBatchStudents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new querybuilder_1.default(batchStudent_model_1.BatchStudentModel, query)
        .search(["studentId"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title duration course_type ",
        },
    ])
        .populate([{ path: "batchId", select: "name" }])
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
    ]);
    const result = yield courseQuery.exec();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to get  . please try again");
    }
    return result;
<<<<<<< HEAD
});
const getSingleBatchStudent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOne({ _id })
        .populate([
        {
            path: "courseId",
            select: "cover_photo course_title duration course_type ",
        },
    ])
        .populate([{ path: "batchId", select: "name" }])
        .populate([
        { path: "studentId", select: "name role phone profile_picture" },
    ]);
=======
<<<<<<< Updated upstream
  });
const getSingleBatchStudent = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOne({
      _id,
=======
});
const getSingleBatchStudent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOne({ _id }).populate([{ path: "courseId", select: "cover_photo course_title duration course_type " },])
        .populate([{ path: "batchId", select: "name" }])
        .populate([{ path: "studentId", select: "name role phone profile_picture" }]);
    ;
>>>>>>> 893945e (Resolved merge conflicts)
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to Create  . please try again");
    }
    return result;
});
const updateBatchStudent = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOneAndUpdate({ _id }, payload, {
        runValidators: true,
        new: true,
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> 893945e (Resolved merge conflicts)
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to update  . please try again");
    }
    return result;
});
const deleteBatchStduent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield batchStudent_model_1.BatchStudentModel.findOneAndUpdate({ _id }, {
        isDeleted: true,
        deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    }, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to delete  . please try again");
    }
    return result;
});
exports.batchStudentService = {
    createBatchStudent,
    updateBatchStudent,
    deleteBatchStduent,
    getAllBatchStudents,
    getSingleBatchStudent,
};
