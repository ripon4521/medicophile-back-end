"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mcqAttemp_controller_1 = require("./mcqAttemp.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const mcqAttemp_validation_1 = require("./mcqAttemp.validation");
const mcqAttempRouter = (0, express_1.Router)();
mcqAttempRouter.post('/submit', (0, validateRequest_1.default)(mcqAttemp_validation_1.mcqAttemptSchema), mcqAttemp_controller_1.mcqAttempController.submitMcqAttemptController);
mcqAttempRouter.get('/:id', mcqAttemp_controller_1.mcqAttempController.getSpeecificMccq);
mcqAttempRouter.get('/', mcqAttemp_controller_1.mcqAttempController.getAllMcq);
exports.default = mcqAttempRouter;
