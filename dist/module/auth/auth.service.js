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
exports.AuthService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const handleCustomError_1 = require("../../helpers/handleCustomError");
const user_model_1 = require("../user/user.model");
const student_model_1 = __importDefault(require("../student/student.model"));
const userCredentials_model_1 = require("../userCredentials/userCredentials.model");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(payload);
    if (!result) {
        throw new handleCustomError_1.CustomError("Failed to create user", 500);
    }
    return result;
});
const login = (payload, meta) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.phone || !payload.password) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Phone and password are required");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.UserModel.findOne({ phone: payload.phone })
            .select("+password")
            .session(session);
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User not found!");
        }
        if (user.status === "Blocked") {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "This user is blocked!");
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
        if (!isPasswordMatched) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Invalid password");
        }
        const student = yield student_model_1.default.findOne({ userId: user._id }).session(session);
        if (!student) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Student not found");
        }
        const existingCredential = yield userCredentials_model_1.UserCredentialsModel.findOne({
            studentId: student._id,
            phone: payload.phone,
            isDeleted: false,
        }).session(session);
        if (existingCredential && (existingCredential.ipAddress !== meta.ipAddress ||
            existingCredential.deviceType !== meta.deviceType ||
            existingCredential.deviceName !== meta.deviceName)) {
            yield userCredentials_model_1.UserCredentialsModel.findOneAndUpdate({});
            existingCredential.isDeleted = true;
            existingCredential.deletedAt = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
            yield existingCredential.save({ session });
        }
        yield userCredentials_model_1.UserCredentialsModel.create([
            {
                studentId: user._id,
                phone: user.phone,
                ipAddress: meta.ipAddress,
                deviceType: meta.deviceType,
                deviceName: meta.deviceName,
                isDeleted: false,
                deletedAt: null,
            },
        ], { session });
        const jwtPayload = {
            phone: user.phone,
            role: user.role,
            _id: user._id.toString(),
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || "primarytestkey", {
            expiresIn: "100d",
        });
        yield session.commitTransaction();
        session.endSession();
        return { token, user };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Logout function
const logout = (payload, meta) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user credentials using phone and device info
    const existingCredential = yield userCredentials_model_1.UserCredentialsModel.findOne({
        phone: payload.phone,
        ipAddress: meta.ipAddress,
        deviceType: meta.deviceType,
        deviceName: meta.deviceName,
        isDeleted: false,
    });
    if (!existingCredential) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Session not found!");
    }
    // Mark the current session as deleted
    existingCredential.isDeleted = true;
    existingCredential.deletedAt = new Date();
    // Save the updated credential status
    yield existingCredential.save();
    return { message: "Logged out successfully" };
});
exports.AuthService = {
    register,
    login,
    logout
};
