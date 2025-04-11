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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_model_1 = require("../module/user/user.model");
const user_constants_1 = require("../module/user/user.constants");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const authUser = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("You are not authorized!");
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "primarytestkey");
        const { role, phone } = decoded;
        const user = yield user_model_1.UserModel.findOne({ phone });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is not found!");
        }
        if (user.role === user_constants_1.USER_STATUS.Blocked) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "This user is blocked!");
        }
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized!");
        }
        req.user = decoded; // Attach decoded token to req.user
        next();
    }));
};
const onlyAdmin = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user || !user.role) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied. No token provided or invalid format.");
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
// const onlyStudent = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const user = req.user;
//     if (!user || !user.role) {
//       throw new Error("Access denied. No token provided or invalid format.");
//     }
//     if (user.role !== USER_ROLE.student) {
//       throw new Error("Access denied only student");
//     }
//     if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
//       throw new Error('You are not authorized!');
//     }
//     next();
//   });
// };
// const onlyFaculty = (...requiredRoles: TUserRole[]) => {
//   return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const user = req.user;
//     if (!user || !user.role) {
//       throw new Error("Access denied. No token provided or invalid format.");
//     }
//     if (user.role !== USER_ROLE.faculty) {
//       throw new Error("Access denied only faculty");
//     }
//     if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
//       throw new Error('You are not authorized!');
//     }
//     next();
//   });
// };
exports.auth = { authUser, onlyAdmin };
