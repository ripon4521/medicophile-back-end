"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountent_controller_1 = require("./accountent.controller");
const accountent_validation_1 = require("./accountent.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const shopManagerRouter = (0, express_1.Router)();
shopManagerRouter.get('/', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin", "admin"), accountent_controller_1.shopManagerController.getAllShopManager);
shopManagerRouter.patch('/:id', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin", "admin"), (0, validateRequest_1.default)(accountent_validation_1.shopManagerValidation.updateShopManagerValidationSchema), accountent_controller_1.shopManagerController.updateShopMnagaer);
shopManagerRouter.delete('/:id', (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("superAdmin"), accountent_controller_1.shopManagerController.deleteShopMnagaer);
shopManagerRouter.get('/:id', accountent_controller_1.shopManagerController.getSingleManager);
exports.default = shopManagerRouter;
