"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const team_validation_1 = require("./team.validation");
const team_controller_1 = require("./team.controller");
const teamRoute = (0, express_1.Router)();
teamRoute.post("/create-team", (0, validateRequest_1.default)(team_validation_1.teamValidation.createTeamSchema), team_controller_1.teamController.createTeam);
teamRoute.get("/", team_controller_1.teamController.getAllTeam);
teamRoute.get("/:slug", team_controller_1.teamController.getSingleTeam);
teamRoute.patch("/:slug", (0, validateRequest_1.default)(team_validation_1.teamValidation.updateTeamSchema), team_controller_1.teamController.updateTeam);
teamRoute.delete("/:slug", team_controller_1.teamController.deleteTeam);
exports.default = teamRoute;
