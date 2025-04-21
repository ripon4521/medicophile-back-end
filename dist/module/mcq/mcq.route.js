"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const mcq_validation_1 = require("./mcq.validation");
const mcq_controller_1 = require("./mcq.controller");
const mcqRoute = (0, express_1.Router)();
mcqRoute.post('/create-mcq', (0, validateRequest_1.default)(mcq_validation_1.mcqValidation.createMcqQuestionSchema), mcq_controller_1.mcqQuestiionController.createMcq);
mcqRoute.get('/', mcq_controller_1.mcqQuestiionController.getAllMCQ);
mcqRoute.get('/:id', mcq_controller_1.mcqQuestiionController.getSpeecificMccq);
mcqRoute.patch('/:id', (0, validateRequest_1.default)(mcq_validation_1.mcqValidation.updateMcqQuestionSchema), mcq_controller_1.mcqQuestiionController.updateMCQ);
mcqRoute.delete('/:id', mcq_controller_1.mcqQuestiionController.deleteMCQ);
exports.default = mcqRoute;
