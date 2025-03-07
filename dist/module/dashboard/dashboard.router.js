"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_conttoller_1 = require("./dashboard.conttoller");
const dashboardRouter = express_1.default.Router();
dashboardRouter.get('/Overview', dashboard_conttoller_1.dashboardController.dashboardOverview);
exports.default = dashboardRouter;
