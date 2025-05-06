"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const performance_controller_1 = require("./performance.controller");
const performanceRoute = (0, express_1.Router)();
performanceRoute.get("/:id", performance_controller_1.fetchPerformance);
exports.default = performanceRoute;
