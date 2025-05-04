"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const referalReward_validation_1 = require("./referalReward.validation");
const referalReward_controller_1 = require("./referalReward.controller");
const referRewardRouter = (0, express_1.Router)();
referRewardRouter.post("/create-refer-reward", (0, validateRequest_1.default)(referalReward_validation_1.referalRewardValidation.createReferralRewardZodSchema), referalReward_controller_1.referRewardController.createReferReward);
referRewardRouter.get("/", referalReward_controller_1.referRewardController.getAllReferDetails);
referRewardRouter.get("/:id", referalReward_controller_1.referRewardController.getSingleReferReward);
referRewardRouter.patch("/:id", (0, validateRequest_1.default)(referalReward_validation_1.referalRewardValidation.updateReferralRewardZodSchema), referalReward_controller_1.referRewardController.updateReferReward);
referRewardRouter.delete("/:id", referalReward_controller_1.referRewardController.deleteReferReward);
exports.default = referRewardRouter;
