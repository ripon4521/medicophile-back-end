"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_validation_1 = require("./feedback.validation");
const feedback_controller_1 = require("./feedback.controller");
const feedbackRouter = (0, express_1.Router)();
feedbackRouter.post('/create-feedback', (0, validateRequest_1.default)(feedback_validation_1.feedbackValidation.createFeedback), feedback_controller_1.feedbackController.createFeedback);
feedbackRouter.get('/', feedback_controller_1.feedbackController.getAllFeedback);
feedbackRouter.get('/:id', feedback_controller_1.feedbackController.getFeedbackById);
feedbackRouter.patch('/:id', (0, validateRequest_1.default)(feedback_validation_1.feedbackValidation.updateFeedback), feedback_controller_1.feedbackController.updateFeedback);
feedbackRouter.delete('/:id', feedback_controller_1.feedbackController.deleteFeedback);
exports.default = feedbackRouter;
