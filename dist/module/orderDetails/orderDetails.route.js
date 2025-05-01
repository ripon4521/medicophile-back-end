"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderDetails_controller_1 = require("./orderDetails.controller");
const orderDetailsRouter = (0, express_1.Router)();
orderDetailsRouter.get('/', orderDetails_controller_1.orderDetailsController.getAllOrderDetails);
exports.default = orderDetailsRouter;
