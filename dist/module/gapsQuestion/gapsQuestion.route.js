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
const gapsQuestion_validation_1 = require("./gapsQuestion.validation");
const gapsQuestion_controller_1 = require("./gapsQuestion.controller");
const gapsQuestionRouter = (0, express_1.Router)();
gapsQuestionRouter.post(
  "/create-gapquestion",
  (0, validateRequest_1.default)(
    gapsQuestion_validation_1.gapsQuestionValidation.createGapsQuestionSchema,
  ),
  gapsQuestion_controller_1.gapsQuestionController.createGapQuestion,
);
gapsQuestionRouter.get(
  "/",
  gapsQuestion_controller_1.gapsQuestionController.getAllGapQuestions,
);
gapsQuestionRouter.get(
  "/:id",
  gapsQuestion_controller_1.gapsQuestionController.getSpeecificGaps,
);
gapsQuestionRouter.delete(
  "/delete-gapquestion",
  gapsQuestion_controller_1.gapsQuestionController.deleteGapQuestion,
);
gapsQuestionRouter.patch(
  "/update-question",
  (0, validateRequest_1.default)(
    gapsQuestion_validation_1.gapsQuestionValidation.updateGapsQuestionSchema,
  ),
  gapsQuestion_controller_1.gapsQuestionController.updateGapQuestion,
);
exports.default = gapsQuestionRouter;
