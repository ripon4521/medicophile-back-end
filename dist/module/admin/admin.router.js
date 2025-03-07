"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import validateRequest from '../../middlewares/validateRequest'
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
/*  auth(USER_ROLE.admin), */
adminRouter.patch('/users/:userId/block', admin_controller_1.adminController.userBlockByAdmin);
adminRouter.delete('/blogs/:id', admin_controller_1.adminController.deleteBlogByAdmin);
/* Overview section handel */
adminRouter.get('/overview', admin_controller_1.adminController.deleteBlogByAdmin);
exports.default = adminRouter;
// /api/admin/users/:userId/block
// /api/admin/blogs/:id
