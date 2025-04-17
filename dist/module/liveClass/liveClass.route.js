"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const liveClass_validation_1 = require("./liveClass.validation");
const liveClass_controller_1 = require("./liveClass.controller");
const liveClassRouter = (0, express_1.Router)();
liveClassRouter.post(
  "/create-liveClass",
  (0, validateRequest_1.default)(
    liveClass_validation_1.liveClassValidation.createliveClassZodSchema,
  ),
  liveClass_controller_1.liveClassController.createLiveClass,
);
liveClassRouter.get(
  "/",
  liveClass_controller_1.liveClassController.getAllLiveClass,
);
liveClassRouter.get(
  "/:slug",
  liveClass_controller_1.liveClassController.getSingleLiveClass,
);
liveClassRouter.patch(
  "/:slug",
  (0, validateRequest_1.default)(
    liveClass_validation_1.liveClassValidation.updateliveClassZodSchema,
  ),
  liveClass_controller_1.liveClassController.updateLiveClass,
);
liveClassRouter.delete(
  "/:slug",
  liveClass_controller_1.liveClassController.deleteLiveClass,
);
exports.default = liveClassRouter;
