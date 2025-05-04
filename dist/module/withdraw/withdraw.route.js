"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const withdraw_validation_1 = require("./withdraw.validation");
const withdraw_controller_1 = require("./withdraw.controller");
const referWithdrawRouter = (0, express_1.Router)();
referWithdrawRouter.post("/create-withdraw", (0, validateRequest_1.default)(withdraw_validation_1.withdrawValidation.createReferralWithdrawalZodSchema), withdraw_controller_1.withdrawController.createReferWithdraw);
referWithdrawRouter.get("/", withdraw_controller_1.withdrawController.getAllReferWithdraw);
referWithdrawRouter.get("/:id", withdraw_controller_1.withdrawController.getSingleReferWithdraw);
referWithdrawRouter.patch("/:id", (0, validateRequest_1.default)(withdraw_validation_1.withdrawValidation.updateReferralWithdrawalZodSchema), withdraw_controller_1.withdrawController.updateReferWithdraw);
referWithdrawRouter.delete("/:id", withdraw_controller_1.withdrawController.deleteReferWithdraw);
exports.default = referWithdrawRouter;
