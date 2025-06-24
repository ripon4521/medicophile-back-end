"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courier_controller_1 = require("./courier.controller");
const pathaoRouter = (0, express_1.Router)();
pathaoRouter.post('/pathao/:orderId', courier_controller_1.pathaoController.createPathaoOrder);
exports.default = pathaoRouter;
