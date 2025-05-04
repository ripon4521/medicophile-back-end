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
const gapAnswer_validation_1 = require("./gapAnswer.validation");
const gapAnswer_controller_1 = require("./gapAnswer.controller");
const gapAnswerRoute = (0, express_1.Router)();
gapAnswerRoute.post(
  "/create-gapanswer",
  (0, validateRequest_1.default)(
    gapAnswer_validation_1.gapAnswerValidation.createGapAnswerSchema,
  ),
  gapAnswer_controller_1.gapAnswerControlller.createGapAnswer,
);
gapAnswerRoute.get(
  "/",
  gapAnswer_controller_1.gapAnswerControlller.getAllGapAnswer,
);
gapAnswerRoute.patch(
  "/update-gapanswer",
  (0, validateRequest_1.default)(
    gapAnswer_validation_1.gapAnswerValidation.updateGapAnswerSchema,
  ),
  gapAnswer_controller_1.gapAnswerControlller.updateGapAsnser,
);
gapAnswerRoute.delete(
  "/delete-gapanswer",
  gapAnswer_controller_1.gapAnswerControlller.deleteGapAnswer,
);
exports.default = gapAnswerRoute;
