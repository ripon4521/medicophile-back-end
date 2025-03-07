"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const research_controller_1 = require("./research.controller");
const researchRoute = express_1.default.Router();
researchRoute.post('/', research_controller_1.researchController.createResearch);
researchRoute.get('/', research_controller_1.researchController.getResearch);
researchRoute.get('/:id', research_controller_1.researchController.getSingleResearch);
researchRoute.patch('/:id', research_controller_1.researchController.updateResearch);
researchRoute.delete("/:id", research_controller_1.researchController.deleteResearch);
exports.default = researchRoute;
