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
exports.auth = exports.onlyFaculty = exports.onlyStudent = exports.onlyAdminAndFacultyAndStudent = exports.onlyAdmin = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_model_1 = require("../module/user/user.model");
const user_constants_1 = require("../module/user/user.constants");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const userCredentials_model_1 = require("../module/userCredentials/userCredentials.model");
const authUser = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                req.user = null;
                return next();
            }
            const accessToken = authHeader.split(" ")[1];
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(accessToken, config_1.default.accessSecret);
            }
            catch (err) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid or expired token.");
            }
            const { role, phone, _id } = decoded;
            // 🔐 Check if session is valid in UserCredentialsModel
            const session = yield userCredentials_model_1.UserCredentialsModel.findOne({
                studentId: _id,
                accessToken,
                isDeleted: false,
            });
            if (!session) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your session is invalid or expired. Please log in again.");
            }
            const user = yield user_model_1.UserModel.findOne({ phone });
            if (!user) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "User not found.");
            }
            if (user.status === "Blocked") {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is blocked.");
            }
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to access this resource.");
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.authUser = authUser;
const onlyAdmin = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user || !user.role) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied. You are not authorized!");
        }
        if (user.role !== user_constants_1.USER_ROLE.admin) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied only admin");
        }
        if (requiredRoles.length && !requiredRoles.includes(user === null || user === void 0 ? void 0 : user.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized!");
        }
        next();
    }));
};
exports.onlyAdmin = onlyAdmin;
const onlyAdminAndFacultyAndStudent = (...allowedRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user || !user.role) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied. You are not authorized!");
        }
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied. You are not authorized!");
        }
        next();
    }));
};
exports.onlyAdminAndFacultyAndStudent = onlyAdminAndFacultyAndStudent;
const onlyStudent = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user || !user.role) {
            throw new Error("Access denied. You are not authorized!");
        }
        if (user.role !== user_constants_1.USER_ROLE.student) {
            throw new Error("Access denied only student");
        }
        if (requiredRoles.length && !requiredRoles.includes(user === null || user === void 0 ? void 0 : user.role)) {
            throw new Error("You are not authorized!");
        }
        next();
    }));
};
exports.onlyStudent = onlyStudent;
const onlyFaculty = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user || !user.role) {
            throw new Error("Access denied. No token provided or invalid format.");
        }
        if (user.role !== user_constants_1.USER_ROLE.teacher) {
            throw new Error("Access denied only faculty");
        }
        if (requiredRoles.length && !requiredRoles.includes(user === null || user === void 0 ? void 0 : user.role)) {
            throw new Error("You are not authorized!");
        }
        next();
    }));
};
exports.onlyFaculty = onlyFaculty;
exports.auth = { authUser: exports.authUser, onlyAdmin: exports.onlyAdmin, onlyFaculty: exports.onlyFaculty };
