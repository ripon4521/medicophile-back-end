"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referDetails_controller_1 = require("./referDetails.controller");
const referDetailsRoute = (0, express_1.Router)();
referDetailsRoute.get("/", referDetails_controller_1.referDetailsController.getAllReferDetails);
referDetailsRoute.get("/:id", referDetails_controller_1.referDetailsController.getSingleReferDetails);
referDetailsRoute.delete("/:id", referDetails_controller_1.referDetailsController.deleteReferDetails);
exports.default = referDetailsRoute;
