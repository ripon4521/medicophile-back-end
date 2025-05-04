"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Assuming this is your custom error handler
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const config_1 = __importDefault(require("../config"));
const verifyAccessToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Assuming Bearer token
    if (!token) {
        return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Access token missing"));
    }
    jsonwebtoken_1.default.verify(token, config_1.default.accessSecret, (err, decoded) => {
        if (err) {
            return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid or expired access token"));
        }
        req.user = decoded;
        next();
    });
};
