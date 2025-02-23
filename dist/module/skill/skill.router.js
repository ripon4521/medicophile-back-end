"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const skill_validation_1 = require("./skill.validation");
const skill_controller_1 = require("./skill.controller");
const skillRouter = (0, express_1.Router)();
skillRouter.post('/create-skill', (0, validateRequest_1.default)(skill_validation_1.skillValidation.createSkill), skill_controller_1.skillController.createSkill);
skillRouter.get('/', skill_controller_1.skillController.getSkills);
skillRouter.get('/:id', skill_controller_1.skillController.getSingleSkillById);
skillRouter.patch('/:id', (0, validateRequest_1.default)(skill_validation_1.skillValidation.updateSkill), skill_controller_1.skillController.updateSkillById);
skillRouter.delete('/:id', skill_controller_1.skillController.deleteSkillById);
exports.default = skillRouter;
