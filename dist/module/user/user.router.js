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
const admin_validation_1 = require("../admin/admin.validation");
const user_validation_1 = require("./user.validation");
const accountent_validation_1 = require("../accountent/accountent.validation");
const userRouter = (0, express_1.Router)();
// userRouter.post('/create-admin', userController.createAdmin);
userRouter.post("/create-student", (0, validateRequest_1.default)(student_validation_1.studentValidation.createStudentSchema), user_controller_1.userController.createStudeent);
userRouter.post("/create-admin", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), (0, validateRequest_1.default)(admin_validation_1.adminValidation.createAdminValidationSchema), user_controller_1.userController.createAdmin);
userRouter.post("/create-manager", 
//  authUser(),onlyAdminAndFacultyAndStudent("admin","superAdmin"),
(0, validateRequest_1.default)(accountent_validation_1.shopManagerValidation.createShopManagerValidationSchema), user_controller_1.userController.createShopManager);
userRouter.get("/profile", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "teacher", "student", "superAdmin", "shopManager"), user_controller_1.userController.getProfile);
userRouter.post("/create-faculty", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), (0, validateRequest_1.default)(faculty_validation_1.facultyValidation.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
userRouter.get("/", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), user_controller_1.userController.getAllUsers);
userRouter.delete("/", auth_1.auth.authUser(), (0, auth_1.onlyAdmin)("superAdmin"), user_controller_1.userController.deleteUsers);
userRouter.patch("/change-password", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("student", "teacher", "admin", "superAdmin", "shopManager"), (0, validateRequest_1.default)(user_validation_1.changePasswordValidation), user_controller_1.userController.changePassord);
exports.default = userRouter;
