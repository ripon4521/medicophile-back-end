"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const jobseeker_validation_1 = require("./jobseeker.validation");
const jobseeker_controller_1 = require("./jobseeker.controller");
const jobSeekerRouter = (0, express_1.Router)();
jobSeekerRouter.post('/create-jobSeeker', (0, validateRequest_1.default)(jobseeker_validation_1.jobSeekerValidation.createJobSeeker), jobseeker_controller_1.jobSeekerController.createJobSeeker);
jobSeekerRouter.get('/', jobseeker_controller_1.jobSeekerController.getJobSeeker);
jobSeekerRouter.get('/:id', jobseeker_controller_1.jobSeekerController.getSingleJobSeeker);
jobSeekerRouter.patch('/:id', (0, validateRequest_1.default)(jobseeker_validation_1.jobSeekerValidation.updateJobSeeker), jobseeker_controller_1.jobSeekerController.updateJobSeeker);
jobSeekerRouter.delete('/:id', jobseeker_controller_1.jobSeekerController.deleteJobSeeker);
exports.default = jobSeekerRouter;
