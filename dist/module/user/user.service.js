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
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
// import StudentUserModel from "../student/student.model";
const faculty_model_1 = __importDefault(require("../teacher/faculty.model"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const student_model_1 = __importDefault(require("../student/student.model"));
const createStudentsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.name = payload.name;
    userData.status = payload.status;
    userData.role = payload.role;
    userData.profile_picture = payload.profile_picture;
    userData.phone = payload.phone;
    userData.password = payload.password;
    userData.email = payload.email;
    userData.isDeleted = payload.isDeleted;
    userData.deletedAt = payload.deletedAt;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        payload.userId = newUser[0]._id;
        const student = yield student_model_1.default.create([payload], { session });
        yield session.commitTransaction();
        session.endSession();
        return { student: student[0] };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Transaction failed: " + error);
    }
});
// const createAdminIntoDB = async (payload: ) => {
//   const userData: Partial<IUser> = {};
//   userData.name = payload.name;
//   userData.status = payload.status;
//   userData.role = 'admin';
//   userData.address = payload.address;
//   userData.contact = payload.contact;
//   userData.password = payload.password
//   userData.gmail = payload.gmail;
//   const newUser = await UserModel.create(userData);
//   return newUser;
// };
const createFacultysIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    userData.name = payload.name;
    userData.status = payload.status;
    userData.role = payload.role;
    userData.profile_picture = payload.profile_picture;
    userData.phone = payload.phone;
    userData.password = payload.password;
    userData.email = payload.email;
    userData.isDeleted = payload.isDeleted;
    userData.deletedAt = payload.deletedAt;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        payload.userId = newUser[0]._id;
        const faculty = yield faculty_model_1.default.create([payload], { session });
        yield session.commitTransaction();
        session.endSession();
        return { faculty: faculty[0] };
    }
    catch (error) {
        console.log("error", error);
        yield session.abortTransaction();
        session.endSession();
        new Error("Transaction failed: " + error);
    }
});
const getUSers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find();
    return users;
});
const deleteUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteMany();
    return result;
});
const getPofile = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    if (!phone)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "phone number is required to fetch profile.");
    const result = yield user_model_1.UserModel.findOne({ phone });
    if (!result)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "User not found.");
    return result;
});
exports.userService = {
    createFacultysIntoDB,
    createStudentsIntoDB,
    getUSers,
    deleteUser,
    getPofile,
};
