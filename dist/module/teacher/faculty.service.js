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
exports.facultysService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const faculty_model_1 = __importDefault(require("./faculty.model"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const getAllFacultys = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.default
      .find({ isDeleted: false })
      .populate("userId");
    return result;
  });
const getFacultyById = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.default
      .findOne({ _id })
      .populate("userId");
    return result;
  });
const updateFaculty = (_id, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
      const teacher = yield faculty_model_1.default
        .findOne({ _id })
        .session(session);
      if (!teacher) {
        throw new AppError_1.default(
          http_status_codes_1.StatusCodes.FORBIDDEN,
          "Faculty not found",
        );
      }
      // Other updates for faculty details...
      const updatedStudent = yield faculty_model_1.default.findOneAndUpdate(
        { _id },
        updateData,
        { new: true, runValidators: true, session },
      );
      if (!updatedStudent) {
        throw new Error("Failed to update faculty");
      }
      const userUpdateData = {};
      const updateStudentData = yield faculty_model_1.default
        .findById(_id)
        .session(session);
      console.log(updatedStudent);
      userUpdateData.email =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.email;
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
      userUpdateData.deletedAt =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.deletedAt;
      userUpdateData.isDeleted =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.isDeleted;
      userUpdateData.profile_picture =
        updateStudentData === null || updateStudentData === void 0
          ? void 0
          : updateStudentData.profile_picture;
      // Update user model
      const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(
        teacher.userId,
        userUpdateData,
        { new: true, runValidators: true, session },
      );
      if (!updatedUser) {
        throw new AppError_1.default(
          http_status_codes_1.StatusCodes.FORBIDDEN,
          "Failed to update user",
        );
      }
      // Commit transaction if everything is fine
      yield session.commitTransaction();
      session.endSession();
      return updatedStudent;
    } catch (error) {
      // Rollback transaction if error occurs
      yield session.abortTransaction();
      session.endSession();
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.FORBIDDEN,
        "Error updating faculty and user",
      );
    }
  });
const deleteFacultyById = (_id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
      // Faculty ke find kore check kora
      const faculty = yield faculty_model_1.default
        .findOne({ _id })
        .session(session);
      if (!faculty) {
        throw new Error("Faculty not found");
      }
      // Faculty er associated user er _id niye delete korbo
      const userId = faculty.userId;
      // FacultyUserModel theke delete
      yield faculty_model_1.default
        .findOneAndUpdate(
          { _id },
          {
            isDeleted: true,
            deletedAt: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
          },
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
        ).session(session);
      }
      // Transaction commit
      yield session.commitTransaction();
      session.endSession();
      return { message: "Faculty and associated user deleted successfully" };
    } catch (error) {
      // Rollback transaction if error occurs
      yield session.abortTransaction();
      session.endSession();
      throw error;
    }
  });
exports.facultysService = {
  getAllFacultys,
  getFacultyById,
  deleteFacultyById,
  updateFaculty,
};
