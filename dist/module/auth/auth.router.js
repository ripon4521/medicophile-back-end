"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthControllers.login);
authRouter.use(globalErrorHandler_1.globalErrorHandler);
exports.default = authRouter;
