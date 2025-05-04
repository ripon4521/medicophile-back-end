"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const modules_validation_1 = require("./modules.validation");
const modules_controller_1 = require("./modules.controller");
const moduleRouter = (0, express_1.Router)();
moduleRouter.post("/create-module", (0, validateRequest_1.default)(modules_validation_1.moduleValidation.createModuleSchema), modules_controller_1.modulesController.createModule);
moduleRouter.patch("/:slug", (0, validateRequest_1.default)(modules_validation_1.moduleValidation.updateModuleSchema), modules_controller_1.modulesController.updateModule);
moduleRouter.get("/", modules_controller_1.modulesController.getAllModule);
moduleRouter.get("/:id", modules_controller_1.modulesController.getSpecificModule);
moduleRouter.get("/:slug", modules_controller_1.modulesController.getSingleModule);
moduleRouter.delete("/:slug", modules_controller_1.modulesController.deleteModule);
exports.default = moduleRouter;
