"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middlewares/auth");
// import validateRequest from '../../middlewares/validateRequest'
const adminRouter = (0, express_1.Router)();
/*  auth(USER_ROLE.admin), */
// adminRouter.patch("/users/:userId/block", adminController.userBlockByAdmin);
// adminRouter.delete("/blogs/:id", adminController.deleteBlogByAdmin);
/* Overview section handel */
adminRouter.get('/', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), admin_controller_1.adminController.getAllAdmin);
adminRouter.patch('/:id', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), (0, validateRequest_1.default)(admin_validation_1.adminValidation.updateAdminValidationSchema), admin_controller_1.adminController.updateAdmin);
adminRouter.delete('/:id', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), admin_controller_1.adminController.deleteAdmin);
adminRouter.get('/:id', admin_controller_1.adminController.getSingleAdmin);
// adminRouter.get("/overview", adminController.deleteBlogByAdmin);
exports.default = adminRouter;
// /api/admin/users/:userId/block
// /api/admin/blogs/:id
