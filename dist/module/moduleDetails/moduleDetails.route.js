"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const moduleDetails_validation_1 = require("./moduleDetails.validation");
const moduleDetails_controller_1 = require("./moduleDetails.controller");
const moduleDetailsRouter = (0, express_1.Router)();
moduleDetailsRouter.post("/create-moduleDetails", (0, validateRequest_1.default)(moduleDetails_validation_1.moduleDetailsValidation.createIModuleDetailsSchema), moduleDetails_controller_1.moduleDetailsController.createModuleDetails);
moduleDetailsRouter.get("/", moduleDetails_controller_1.moduleDetailsController.getAllModuleDetails);
moduleDetailsRouter.get("/:id", moduleDetails_controller_1.moduleDetailsController.getSingleModuleDetails);
moduleDetailsRouter.patch("/:id", (0, validateRequest_1.default)(moduleDetails_validation_1.moduleDetailsValidation.updateIModuleDetailsSchema), moduleDetails_controller_1.moduleDetailsController.updateModuleDetails);
moduleDetailsRouter.delete("/:id", moduleDetails_controller_1.moduleDetailsController.deleteModuleDetails);
exports.default = moduleDetailsRouter;
