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
const handleCustomError_1 = require("../../helpers/handleCustomError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(payload);
    if (!result) {
        throw new handleCustomError_1.CustomError('Failed to create user', 500);
    }
    return result;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.gmail || !payload.password) {
        throw { message: 'Gmail and password are required', statusCode: 400 };
    }
    const user = yield user_model_1.UserModel.findOne({ gmail: payload.gmail }).select('+password');
    if (!user) {
        throw new Error('User not found!');
    }
    if (user.status === 'blocked') {
        throw new Error('This user is blocked!');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error('Invalid password');
    }
    const jwtPayload = {
        gmail: user.gmail,
        role: user.role,
        _id: user._id.toString(),
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || 'primarytestkey', { expiresIn: '10d' });
    return { token, user };
});
exports.AuthService = {
    register,
    login,
};
