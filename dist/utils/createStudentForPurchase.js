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
exports.createStudentWithUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../module/user/user.model");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const sendSms_1 = require("./sendSms");
const student_model_1 = __importDefault(require("../module/student/student.model"));
const createStudentWithUser = (payload, externalSession) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.UserModel.findOne({ phone: payload.phone, isDeleted: false });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "This user already exists. Please login.");
    }
    const session = externalSession || (yield mongoose_1.default.startSession());
    const isNewSession = !externalSession;
    if (isNewSession)
        session.startTransaction();
    try {
        const plainPassword = Math.floor(100000 + Math.random() * 900000).toString();
        const sms = yield (0, sendSms_1.sendSMS)(payload.phone, `আপনার কোর্সটি পার্চেস হয়েছে। 
লগ ইন করতে আপনার ফোন নাম্বার এবং এই ${plainPassword} পাসওয়ার্ড দিয়ে লগ ইন করুন।`);
        if (!sms) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Student creation failed while sending SMS.");
        }
        const studentData = Object.assign({}, payload);
        const createdStudent = yield student_model_1.default.create([studentData], { session });
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, 12);
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
        yield student_model_1.default.updateOne({ _id: createdStudent[0]._id }, { userId: newUser[0]._id }, { session });
        if (isNewSession) {
            yield session.commitTransaction();
            session.endSession();
        }
        return {
            student: createdStudent[0],
            user: newUser[0],
        };
    }
    catch (error) {
        if (isNewSession) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw new Error("Transaction failed: " + (error instanceof Error ? error.message : error));
    }
});
exports.createStudentWithUser = createStudentWithUser;
