"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const application_validation_1 = require("./application.validation");
const application_controller_1 = require("./application.controller");
const applicationRouter = (0, express_1.Router)();
applicationRouter.post('/create-application', (0, validateRequest_1.default)(application_validation_1.applicationValidation.createApplication), application_controller_1.applicationController.cerateApplication);
applicationRouter.get('/', application_controller_1.applicationController.getAllApplications);
applicationRouter.get('/:id', application_controller_1.applicationController.getSingleApplication);
applicationRouter.patch('/:id', (0, validateRequest_1.default)(application_validation_1.applicationValidation.updateApplication), application_controller_1.applicationController.updateApplication);
applicationRouter.delete('/:id', application_controller_1.applicationController.deleteApplication);
exports.default = applicationRouter;
