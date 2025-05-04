"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const referDetails_controller_1 = require("./referDetails.controller");
const referDetailsRoute = (0, express_1.Router)();
<<<<<<< HEAD
referDetailsRoute.get("/", referDetails_controller_1.referDetailsController.getAllReferDetails);
referDetailsRoute.get("/:id", referDetails_controller_1.referDetailsController.getSingleReferDetails);
referDetailsRoute.delete("/:id", referDetails_controller_1.referDetailsController.deleteReferDetails);
=======
referDetailsRoute.get('/', referDetails_controller_1.referDetailsController.getAllReferDetails);
referDetailsRoute.get('/:id', referDetails_controller_1.referDetailsController.getSingleReferDetails);
referDetailsRoute.delete('/:id', referDetails_controller_1.referDetailsController.deleteReferDetails);
>>>>>>> 893945e (Resolved merge conflicts)
exports.default = referDetailsRoute;
