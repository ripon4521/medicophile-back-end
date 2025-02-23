"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
// import { USER_ROLE } from './user.constants'
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const userRouter = (0, express_1.Router)();
userRouter.post('/user-create', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userController.createUser);
userRouter.get('/profile', (0, auth_1.default)(), user_controller_1.userController.getProfile);
userRouter.get('/:userId', user_controller_1.userController.getSingleUser);
userRouter.put('/:userId', user_controller_1.userController.updateUser);
userRouter.delete('/:userId', user_controller_1.userController.deleteUser);
userRouter.get('/', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), user_controller_1.userController.getUser);
// userRouter.get('/', userController.getUser)
exports.default = userRouter;
