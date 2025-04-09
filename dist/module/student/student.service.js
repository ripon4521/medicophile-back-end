"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const student_model_1 = __importDefault(require("./student.model"));
const getAllStudents = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default
      .find({ isDeleted: false })
      .populate("userId");
    return result;
  });
const getStudentById = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default
      .findOne({ _id })
      .populate("userId");
    return result;
  });
const deleteStudentById = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
      // Student ke find kore check kora
      const student = yield student_model_1.default
        .findOne({ _id })
        .session(session);
      if (!student) {
        throw new Error("Student not found");
      }
      // Student er associated user er _id niye delete korbo
      const userId = student.userId;
      // StudentUserModel theke delete
      yield student_model_1.default
        .findOneAndUpdate(
          { _id },
          {
            isDeleted: true,
            deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
          },
          { new: true },
        )
        .session(session);
      // UserModel theke user delete
      if (userId) {
        yield user_model_1.UserModel.findOneAndUpdate(
          { _id: userId },
          {
            isDeleted: true,
            deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
          },
          { new: true },
        ).session(session);
      }
      // Transaction commit
      yield session.commitTransaction();
      session.endSession();
      return { message: "Student and associated user deleted successfully" };
    } catch (error) {
      // Rollback transaction if error occurs
      yield session.abortTransaction();
      session.endSession();
      throw error;
    }
  });
const updateStudent = (_id, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
      const student = yield student_model_1.default
        .findById(_id)
        .session(session);
      if (!student) {
        throw new Error("Student not found");
      }
      // Update Student model
      const updatedStudent = yield student_model_1.default.findByIdAndUpdate(
        _id,
        updateData,
        { new: true, runValidators: true, session },
      );
      if (!updatedStudent) {
        throw new Error("Failed to update student");
      }
      const userUpdateData = {};
      const updateStudentData = yield student_model_1.default
        .findById(_id)
        .session(session);
      userUpdateData.email =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.email;
      userUpdateData.role =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.role;
      userUpdateData.name =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.name;
      userUpdateData.phone =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.phone;
      userUpdateData.status =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.status;
      userUpdateData.profile_picture =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.profile_picture;
      userUpdateData.isDeleted =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.isDeleted;
      userUpdateData.deletedAt =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.deletedAt;
      // Update user model
      const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(
        student.userId,
        userUpdateData,
        { new: true, runValidators: true, session },
      );
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }
      // Commit transaction if everything is fine
      yield session.commitTransaction();
      session.endSession();
      return updatedStudent;
    } catch (error) {
      // Rollback transaction if error occurs
      yield session.abortTransaction();
      session.endSession();
      throw new Error("Error updating student and user");
    }
  });
exports.studentsService = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudent,
};
