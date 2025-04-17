"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classQuizeQuestion_validation_1 = require("./classQuizeQuestion.validation");
const classQuizeQuestion_controller_1 = require("./classQuizeQuestion.controller");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const cqQuestionRouter = (0, express_1.Router)();
cqQuestionRouter.post(
  "/create-cqquestion",
  (0, validateRequest_1.default)(
    classQuizeQuestion_validation_1.classQuizeQuestionValidation
      .createCqQuestionSchema,
  ),
  classQuizeQuestion_controller_1.cqQuestionController.createCqQuestion,
);
cqQuestionRouter.get(
  "/",
  classQuizeQuestion_controller_1.cqQuestionController.getAllCqQuestion,
);
cqQuestionRouter.patch(
  "/update-cqquestion",
  (0, validateRequest_1.default)(
    classQuizeQuestion_validation_1.classQuizeQuestionValidation
      .updateCqQuestionSchema,
  ),
  classQuizeQuestion_controller_1.cqQuestionController.updateCqQuestion,
);
cqQuestionRouter.delete(
  "/delete-cqquestion",
  classQuizeQuestion_controller_1.cqQuestionController.deleteCqQuestion,
);
exports.default = cqQuestionRouter;
