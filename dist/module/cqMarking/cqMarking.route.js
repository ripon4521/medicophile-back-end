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
const cqMarking_controller_1 = require("./cqMarking.controller");
const cqMarking_validation_1 = require("./cqMarking.validation");
const cqMarkingRouter = (0, express_1.Router)();
cqMarkingRouter.post(
  "/create-cqmarking",
  (0, validateRequest_1.default)(
    cqMarking_validation_1.cqMarkingValidation.createCqMarkingSchema,
  ),
  cqMarking_controller_1.cqMarkingContoller.createCqMarking,
);
cqMarkingRouter.get(
  "/",
  cqMarking_controller_1.cqMarkingContoller.getAllCqMarking,
);
cqMarkingRouter.patch(
  "/update-cqmarking",
  (0, validateRequest_1.default)(
    cqMarking_validation_1.cqMarkingValidation.updateCqMarkingSchema,
  ),
  cqMarking_controller_1.cqMarkingContoller.updateCqMarking,
);
cqMarkingRouter.delete(
  "/delete-cqmarking",
  cqMarking_controller_1.cqMarkingContoller.deleteCqMarking,
);
cqMarkingRouter.get(
  "/get-specificcqmarking",
  cqMarking_controller_1.cqMarkingContoller.getSpecificCqMarking,
);
exports.default = cqMarkingRouter;
