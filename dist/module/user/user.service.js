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
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendSms_1 = require("../../utils/sendSms");
const http_status_1 = __importDefault(require("http-status"));
const generate6DigitPassword = () => Math.floor(100000 + Math.random() * 900000).toString();
const createStudentsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Create student first (without userId)
        const studentData = Object.assign({}, payload);
        const createdStudent = yield student_model_1.default.create([studentData], {
            session,
        });
        const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();
        const sms = yield (0, sendSms_1.sendSMS)(payload.phone, `Your login password is: ${plainPassword}`);
        // if (sms?.response_code != 202	) {
        //   throw new AppError(StatusCodes.FORBIDDEN, "Failed to create student. Please try again")
        // }
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, 12);
        // Step 4: Create user using data from createdStudent
        const userData = {
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
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        // Step 5: Update student with userId
        yield student_model_1.default.updateOne({ _id: createdStudent[0]._id }, { userId: newUser[0]._id }, { session });
        yield session.commitTransaction();
        session.endSession();
        return {
            student: createdStudent[0],
            user: newUser[0],
            password: plainPassword, // send this if needed (for SMS/email)
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Transaction failed: " + error);
    }
});
const createAdmiIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Create admin first (without userId)
        const adminData = Object.assign({}, payload);
        const createdAdmin = yield admin_model_1.default.create([adminData], { session });
        const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();
        // console.log(plainPassword)
        const sms = yield (0, sendSms_1.sendSMS)(payload.phone, `Your login password is: ${plainPassword}`);
        // console.log(sms)
        // if (sms?.response_code != 202	) {
        //   throw new AppError(StatusCodes.FORBIDDEN, "Failed to create Admin. Please try again")
        // }
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, 12);
        // Step 2: Now create the user using createdAdmin data
        const userData = {
            name: (_a = createdAdmin[0]) === null || _a === void 0 ? void 0 : _a.name,
            status: (_b = createdAdmin[0]) === null || _b === void 0 ? void 0 : _b.status,
            role: (_c = createdAdmin[0]) === null || _c === void 0 ? void 0 : _c.role,
            profile_picture: (_d = createdAdmin[0]) === null || _d === void 0 ? void 0 : _d.profile_picture,
            phone: (_e = createdAdmin[0]) === null || _e === void 0 ? void 0 : _e.phone,
            password: hashedPassword,
            email: (_f = createdAdmin[0]) === null || _f === void 0 ? void 0 : _f.email,
            isDeleted: (_g = createdAdmin[0]) === null || _g === void 0 ? void 0 : _g.isDeleted,
            deletedAt: (_h = createdAdmin[0]) === null || _h === void 0 ? void 0 : _h.deletedAt,
        };
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        // Step 3: Update admin with the newly created userId
        yield admin_model_1.default.updateOne({ _id: createdAdmin[0]._id }, { userId: newUser[0]._id }, { session });
        yield session.commitTransaction();
        session.endSession();
        return { admin: createdAdmin[0], user: newUser[0] };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Transaction failed: " + error);
    }
});
const createFacultysIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Create admin first (without userId)
        const faculty = Object.assign({}, payload);
        const createdFaculty = yield faculty_model_1.default.create([faculty], {
            session,
        });
        const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();
        // console.log(plainPassword)
        const sms = yield (0, sendSms_1.sendSMS)(payload.phone, `Your login password is: ${plainPassword}`);
        // console.log(sms)
        // if (sms?.response_code != 202	) {
        //   throw new AppError(StatusCodes.FORBIDDEN, "Failed to create Admin. Please try again")
        // }
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, 12);
        // Step 2: Now create the user using createdAdmin data
        const userData = {
            name: (_a = createdFaculty[0]) === null || _a === void 0 ? void 0 : _a.name,
            status: (_b = createdFaculty[0]) === null || _b === void 0 ? void 0 : _b.status,
            role: (_c = createdFaculty[0]) === null || _c === void 0 ? void 0 : _c.role,
            profile_picture: (_d = createdFaculty[0]) === null || _d === void 0 ? void 0 : _d.profile_picture,
            phone: (_e = createdFaculty[0]) === null || _e === void 0 ? void 0 : _e.phone,
            password: hashedPassword,
            email: (_f = createdFaculty[0]) === null || _f === void 0 ? void 0 : _f.email,
            isDeleted: (_g = createdFaculty[0]) === null || _g === void 0 ? void 0 : _g.isDeleted,
            deletedAt: (_h = createdFaculty[0]) === null || _h === void 0 ? void 0 : _h.deletedAt,
        };
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        // Step 3: Update admin with the newly created userId
        yield faculty_model_1.default.updateOne({ _id: createdFaculty[0]._id }, { userId: newUser[0]._id }, { session });
        yield session.commitTransaction();
        session.endSession();
        return { admin: createdFaculty[0], user: newUser[0] };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Transaction failed: " + error);
    }
});
// const createFacultysIntoDB = async (payload: IFaculty) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const generatedPassword = generate6DigitPassword();
//    const sms = await sendSMS(payload.phone, `Your Faculty Login Password is: ${generatedPassword}`);
//     // if (sms?.response_code != 202	) {
//     //   throw new AppError(StatusCodes.FORBIDDEN, "Failed to create teacher. Please try again")
//     // }
//     const hashedPassword = await bcrypt.hash(generatedPassword, 12);
//     const createdFaculty = await FacultyUserModel.create([payload], { session });
//     const userData: Partial<IUser> = {
//       name: createdFaculty[0]?.name,
//       status: createdFaculty[0]?.status,
//       role: createdFaculty[0]?.role,
//       profile_picture: createdFaculty[0]?.profile_picture,
//       phone: createdFaculty[0]?.phone,
//       email: createdFaculty[0]?.email,
//       password: hashedPassword,
//       isDeleted: createdFaculty[0]?.isDeleted,
//       deletedAt: createdFaculty[0]?.deletedAt,
//     };
//     const createdUser = await UserModel.create([userData], { session });
//     await adminModel.updateOne(
//       { _id: createdFaculty[0]._id },
//       { userId: createdUser[0]._id },
//       { session }
//     );
//     await session.commitTransaction();
//     session.endSession();
//     return {
//       faculty: createdFaculty[0],
//       user: createdUser[0],
//     };
//   } catch (error) {
//     console.error("Transaction Error:", error);
//     await session.abortTransaction();
//     session.endSession();
//     throw new Error("Transaction failed: " + error);
//   }
// };
const changePassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, oldPassword, newPassword, confirmPassword } = payload;
    const user = yield user_model_1.UserModel.findOne({ phone });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found with this phone number");
    }
    // Check if old password matches
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Old password is incorrect");
    }
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "New password and confirm password do not match");
    }
    // Hash and update new password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
    user.password = hashedPassword;
    yield user.save();
    return "Password changed successfully";
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
    createAdmiIntoDB,
    changePassword,
};
