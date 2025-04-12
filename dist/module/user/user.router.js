"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const faculty_validation_1 = require("../teacher/faculty.validation");
const student_validation_1 = require("../student/student.validation");
const userRouter = (0, express_1.Router)();
// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post("/create-student", (0, validateRequest_1.default)(student_validation_1.studentValidation.createStudentSchema), user_controller_1.userController.createStudeent);
userRouter.get("/profile", auth_1.auth.authUser("superAdmin", "admin", "teacher", "student"), user_controller_1.userController.getProfile);
userRouter.post("/create-faculty", (0, validateRequest_1.default)(faculty_validation_1.facultyValidation.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
userRouter.get("/", auth_1.auth.authUser("teacher"), user_controller_1.userController.getAllUsers);
userRouter.delete("/", auth_1.auth.authUser("admin"), user_controller_1.userController.deleteUsers);
exports.default = userRouter;
