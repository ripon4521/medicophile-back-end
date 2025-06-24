"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderDetails_controller_1 = require("./orderDetails.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const orderDetails_validation_1 = require("./orderDetails.validation");
const orderDetailsRouter = (0, express_1.Router)();
orderDetailsRouter.get('/', orderDetails_controller_1.orderDetailsController.getAllOrderDetails);
orderDetailsRouter.patch('/:id', (0, validateRequest_1.default)(orderDetails_validation_1.updateOrderDetailsZodSchema), orderDetails_controller_1.orderDetailsController.updateOrderDetails);
orderDetailsRouter.delete('/:id', orderDetails_controller_1.orderDetailsController.deleteOrderDetails);
orderDetailsRouter.get("/ebook/:slug", orderDetails_controller_1.orderDetailsController.getSingleEbook);
orderDetailsRouter.get('/ebook', orderDetails_controller_1.orderDetailsController.getAllEbook);
exports.default = orderDetailsRouter;
5;
