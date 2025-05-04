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
const userCredentials_model_1 = require("../userCredentials/userCredentials.model");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
<<<<<<< HEAD
const sendSms_1 = require("../../utils/sendSms");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
=======
<<<<<<< Updated upstream
const register = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
=======
const sendSms_1 = require("../../utils/sendSms");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
>>>>>>> Stashed changes
>>>>>>> 893945e (Resolved merge conflicts)
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
        const student = yield user_model_1.UserModel.findOne({ _id: user._id }).session(session);
        if (!student) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        const existingCredential = yield userCredentials_model_1.UserCredentialsModel.findOne({
            studentId: student._id,
            phone: payload.phone,
            isDeleted: false,
        }).session(session);
        const jwtPayload = {
            phone: user.phone,
            role: user.role,
            _id: user._id.toString(),
        };
        const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.accessSecret, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.refreshSecret, {
            expiresIn: "30d",
        });
        if (existingCredential &&
            (existingCredential.ipAddress !== meta.ipAddress ||
                existingCredential.deviceType !== meta.deviceType ||
                existingCredential.deviceName !== meta.deviceName)) {
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
                accessToken: accessToken,
                refreshToken: refreshToken,
                deletedAt: null,
            },
        ], { session });
        yield session.commitTransaction();
        session.endSession();
        return { accessToken, refreshToken, user };
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
<<<<<<< HEAD
});
const resetPassword = (phone) => __awaiter(void 0, void 0, void 0, function* () {
=======
<<<<<<< Updated upstream
  });
const resetPassword = (phone) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
=======
});
const resetPassword = (phone) => __awaiter(void 0, void 0, void 0, function* () {
>>>>>>> Stashed changes
>>>>>>> 893945e (Resolved merge conflicts)
    const user = yield user_model_1.UserModel.findOne({ phone: phone });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found with this phone number");
    }
    // Generate random 6-digit password
    const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
<<<<<<< HEAD
    const sms = yield (0, sendSms_1.sendSMS)(phone, `Your login password is: ${newPassword}`);
    if (!sms) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password Reset Failed.");
=======
<<<<<<< Updated upstream
    // Prepare SMS payload for GreenWeb
    const smsPayload = {
      token: process.env.GREENWEB_API_TOKEN,
      to: phone,
      message: `Your new password is: ${newPassword}`,
    };
    try {
      const response = yield axios_1.default.post(
        "http://api.greenweb.com.bd/api.php",
        null,
        {
          params: smsPayload,
        },
      );
      // Check GreenWeb's response content
      const responseData = response.data.toString().trim().toLowerCase();
      if (!responseData.includes("success")) {
        throw new Error(`GreenWeb response: ${responseData}`);
      }
    } catch (error) {
      console.error(
        "SMS sending failed:",
        ((_a = error === null || error === void 0 ? void 0 : error.response) ===
          null || _a === void 0
          ? void 0
          : _a.data) || error.message,
      );
      throw new AppError_1.default(
        http_status_1.default.BAD_REQUEST,
        "SMS sending failed: " + error.message,
      );
=======
    const sms = yield (0, sendSms_1.sendSMS)(phone, `Your login password is: ${newPassword}`);
    if (!sms) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password Reset Failed.");
>>>>>>> Stashed changes
>>>>>>> 893945e (Resolved merge conflicts)
    }
    // Hash and update the new password
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
    user.password = hashedPassword;
    yield user.save();
    return "New password sent via SMS and updated successfully.";
});
exports.AuthService = {
    register,
    login,
    logout,
    resetPassword,
};
