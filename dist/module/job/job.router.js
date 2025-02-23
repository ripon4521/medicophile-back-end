"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const job_validation_1 = require("./job.validation");
const job_controller_1 = require("./job.controller");
const jobRouter = (0, express_1.Router)();
jobRouter.post('/create-job', (0, validateRequest_1.default)(job_validation_1.jobValidation.createJob), job_controller_1.jobController.createJob);
jobRouter.get('/', job_controller_1.jobController.getAllJobs);
jobRouter.get('/:id', job_controller_1.jobController.getJobById);
jobRouter.patch('/:id', (0, validateRequest_1.default)(job_validation_1.jobValidation.updateJob), job_controller_1.jobController.updateJob);
jobRouter.delete('/:id', job_controller_1.jobController.deleteJob);
exports.default = jobRouter;
