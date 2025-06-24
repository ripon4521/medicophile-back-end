"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const auth_1 = require("../../middlewares/auth");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/stats", (0, auth_1.authUser)(), 
// onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager"), 
order_controller_1.orderController.getOrderStats);
orderRouter.post("/create-order", (0, validateRequest_1.default)(order_validation_1.orderValidation.createOrderZodSchema), order_controller_1.orderController.createOrder);
orderRouter.get("/", (0, auth_1.authUser)(), 
//  onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager", "student") , 
order_controller_1.orderController.getAllOrders);
orderRouter.patch("/:id", 
// authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "shopManager", "student") ,
(0, validateRequest_1.default)(order_validation_1.orderValidation.updateOrderZodSchema), order_controller_1.orderController.updateOrder);
orderRouter.delete("/:id", (0, auth_1.authUser)(), (0, auth_1.onlyAdminAndFacultyAndStudent)("admin", "superAdmin", "student"), order_controller_1.orderController.deleteOrder);
exports.default = orderRouter;
