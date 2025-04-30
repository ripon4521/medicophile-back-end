"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const productRouter = (0, express_1.Router)();
productRouter.post('/create-product', (0, validateRequest_1.default)(product_validation_1.productValidation.createProductSchema), product_controller_1.productController.createProduct);
productRouter.get('/', product_controller_1.productController.getAllProducts);
productRouter.get('/:slug', product_controller_1.productController.getSingleProduct);
productRouter.patch('/:slug', (0, validateRequest_1.default)(product_validation_1.productValidation.updateProductSchema), product_controller_1.productController.updateProduct);
productRouter.delete('/:slug', product_controller_1.productController.deleteProduct);
exports.default = productRouter;
