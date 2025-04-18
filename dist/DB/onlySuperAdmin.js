"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlySuperAdmin = void 0;
const AppError_1 = __importDefault(require("../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const user_constants_1 = require("../module/user/user.constants");
const onlySuperAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== user_constants_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Only Super Admin can access this route.");
    }
    next();
};
exports.onlySuperAdmin = onlySuperAdmin;
