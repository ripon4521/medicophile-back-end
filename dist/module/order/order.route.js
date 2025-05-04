"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post("/create-order", (0, validateRequest_1.default)(order_validation_1.orderValidation.createOrderZodSchema), order_controller_1.orderController.createOrder);
orderRouter.get("/", order_controller_1.orderController.getAllOrders);
orderRouter.patch("/:id", (0, validateRequest_1.default)(order_validation_1.orderValidation.updateOrderZodSchema), order_controller_1.orderController.updateOrder);
orderRouter.delete("/:id", order_controller_1.orderController.deleteOrder);
exports.default = orderRouter;
