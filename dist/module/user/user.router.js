"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_validation_1 = require("../student/student.validation");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/create-student', (0, validateRequest_1.default)(student_validation_1.studentsValidation.createStudentValidationSchema), user_controller_1.userController.createStudeent);
userRouter.get('/', user_controller_1.userController.getAllUsers);
userRouter.delete('/', user_controller_1.userController.deleteUsers);
exports.default = userRouter;
