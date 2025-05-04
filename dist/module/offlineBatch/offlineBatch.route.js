"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offlineBatch_validation_1 = require("./offlineBatch.validation");
const offLineBatch_controller_1 = require("./offLineBatch.controller");
const offlineBatchRouter = (0, express_1.Router)();
offlineBatchRouter.post("/create-offline-batch", (0, validateRequest_1.default)(offlineBatch_validation_1.offlineBatchValidation.createOfflineBatchSchema), offLineBatch_controller_1.offlineBatchController.createOfflineBatch);
offlineBatchRouter.get("/", offLineBatch_controller_1.offlineBatchController.getAllOfflineBatch);
offlineBatchRouter.patch("/:slug", (0, validateRequest_1.default)(offlineBatch_validation_1.offlineBatchValidation.updateOfflineBatchSchema), offLineBatch_controller_1.offlineBatchController.updateOfflineBatch);
offlineBatchRouter.delete("/:slug", offLineBatch_controller_1.offlineBatchController.deleteOfflineBatch);
offlineBatchRouter.get("/:slug", offLineBatch_controller_1.offlineBatchController.getSingleOfflineBatch);
exports.default = offlineBatchRouter;
