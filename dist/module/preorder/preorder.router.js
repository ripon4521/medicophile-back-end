"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const preorder_validation_1 = require("./preorder.validation");
const preorder_controller_1 = require("./preorder.controller");
const preOrderRouter = express_1.default.Router();
preOrderRouter.post('/craete-preOrder', (0, validateRequest_1.default)(preorder_validation_1.preOrderValidations.createpreOrderSchema), preorder_controller_1.preorderController.createPreOrder);
preOrderRouter.get('/', preorder_controller_1.preorderController.getAllPreOrders);
preOrderRouter.get('/:id', preorder_controller_1.preorderController.getSinglePreOrder);
preOrderRouter.patch('/:id', (0, validateRequest_1.default)(preorder_validation_1.preOrderValidations.updatepreOrderSchema), preorder_controller_1.preorderController.updatePreOrder);
preOrderRouter.delete('/:id', preorder_controller_1.preorderController.deletePreOrder);
exports.default = preOrderRouter;
