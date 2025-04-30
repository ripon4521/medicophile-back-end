"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentDetails_controller_1 = require("./paymentDetails.controller");
const paymentDetilsRoute = (0, express_1.Router)();
paymentDetilsRoute.get("/", paymentDetails_controller_1.paymentDetailsController.getAllPamentyDetails);
exports.default = paymentDetilsRoute;
