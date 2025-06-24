"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const token_validation_1 = require("./token.validation");
const bkash_controller_1 = require("./bkash.controller");
const tokenRouter = (0, express_1.Router)();
tokenRouter.post('/create-token', (0, validateRequest_1.default)(token_validation_1.TokenSchema), bkash_controller_1.tokenController.createToken);
tokenRouter.get('/', bkash_controller_1.tokenController.getToken);
exports.default = tokenRouter;
