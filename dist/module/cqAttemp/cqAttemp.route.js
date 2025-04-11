"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cqAttemp_validation_1 = require("./cqAttemp.validation");
const cqAttemp_controller_1 = require("./cqAttemp.controller");
const cqAttempRouter = (0, express_1.Router)();
cqAttempRouter.post("/create-cqattemp", (0, validateRequest_1.default)(cqAttemp_validation_1.cqAttempsValidation.createCqAttemptValidationSchema), cqAttemp_controller_1.cqAttempController.createCqAttemp);
cqAttempRouter.get("/", cqAttemp_controller_1.cqAttempController.getAllCqAttemp);
cqAttempRouter.patch("/update-cqattemp", (0, validateRequest_1.default)(cqAttemp_validation_1.cqAttempsValidation.updateCqAttemptValidationSchema), cqAttemp_controller_1.cqAttempController.updateCqAttemp);
cqAttempRouter.delete("/delete-cqattemp", cqAttemp_controller_1.cqAttempController.deleteCqAttemp);
exports.default = cqAttempRouter;
