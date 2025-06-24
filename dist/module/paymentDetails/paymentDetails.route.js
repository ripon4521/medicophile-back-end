"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentDetails_controller_1 = require("./paymentDetails.controller");
const auth_1 = require("../../middlewares/auth");
const paymentDetilsRoute = (0, express_1.Router)();
paymentDetilsRoute.get("/", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin"), paymentDetails_controller_1.paymentDetailsController.getAllPamentyDetails);
exports.default = paymentDetilsRoute;
