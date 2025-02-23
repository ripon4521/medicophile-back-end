"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const recruiter_validation_1 = require("./recruiter.validation");
const recruiter_controller_1 = require("./recruiter.controller");
const recruiterRouter = (0, express_1.Router)();
recruiterRouter.post('/create-recruiter', (0, validateRequest_1.default)(recruiter_validation_1.recruiterValidation.createRecruiter), recruiter_controller_1.recruiterController.createRecruiterIntoDB);
recruiterRouter.get('/', recruiter_controller_1.recruiterController.getAllRecruiters);
recruiterRouter.get('/:id', recruiter_controller_1.recruiterController.getRecruiterById);
recruiterRouter.patch('/:id', recruiter_controller_1.recruiterController.updateRecruiterById);
recruiterRouter.delete('/:id', recruiter_controller_1.recruiterController.deleteRecruiterById);
exports.default = recruiterRouter;
