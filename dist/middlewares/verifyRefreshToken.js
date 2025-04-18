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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../module/user/user.model");
const verifyRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Refresh token missing"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refreshSecret);
        // Type assertion here
        const payload = decoded; // Assert decoded as JwtPayload
        // Optionally: Check if refreshToken is valid by querying DB for session
        const user = yield user_model_1.UserModel.findById(payload._id);
        if (!user) {
            return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid refresh token"));
        }
        // Create a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ phone: user.phone, role: user.role, _id: user._id.toString() }, config_1.default.accessSecret, { expiresIn: "1h" });
        res.json({ accessToken: newAccessToken });
    }
    catch (err) {
        return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid or expired refresh token"));
    }
});
