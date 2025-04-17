"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const getDeviceInfo_1 = require("../../middlewares/getDeviceInfo");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.register(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.CREATED,
      status: true,
      message: "User registered successfully",
      data: result,
    });
  }),
);
const login = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const meta = (0, getDeviceInfo_1.getDeviceInfo)(req);
    const result = yield auth_service_1.AuthService.login(req.body, meta);
    const { accessToken, refreshToken, user } = result;
    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      secure: config_1.default.nodeEnv === "development",
      httpOnly: true, // JS access off
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    // Send access token and user data
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
      status: true,
      message: "Login successful",
      data: {
        accessToken: accessToken || "",
        user: user || {},
      },
    });
  }),
);
const logout = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const meta = (0, getDeviceInfo_1.getDeviceInfo)(req);
    const payload = req.body;
    const result = yield auth_service_1.AuthService.logout(payload, meta);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
      status: true,
      message: "Logout successful",
      data: result,
    });
  }),
);
const resetPassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let { phone } = req.body;
    // Handle if phone is nested (defensive coding)
    if (
      typeof phone === "object" &&
      (phone === null || phone === void 0 ? void 0 : phone.phone)
    ) {
      phone = phone.phone;
    }
    if (typeof phone !== "string") {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Invalid phone number format.",
      );
    }
    console.log("Received phone:", phone);
    const result = yield auth_service_1.AuthService.resetPassword(phone);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
      status: true,
      message: "Password Reset Successful",
      data: result,
    });
  }),
);
const refreshToken = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.UNAUTHORIZED,
        "Refresh token is missing.",
      );
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jsonwebtoken_1.default.verify(
        token,
        config_1.default.refreshSecret,
      );
      const newAccessToken = jsonwebtoken_1.default.sign(
        {
          phone: decoded.phone,
          role: decoded.role,
          _id: decoded._id,
        },
        config_1.default.accessSecret,
        { expiresIn: "1h" },
      );
      res.status(200).json({
        success: true,
        message: "New access token generated successfully.",
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      throw new AppError_1.default(
        http_status_codes_1.StatusCodes.UNAUTHORIZED,
        "Invalid or expired refresh token.",
      );
    }
  }),
);
exports.AuthControllers = {
  register,
  login,
  logout,
  resetPassword,
  refreshToken,
};
