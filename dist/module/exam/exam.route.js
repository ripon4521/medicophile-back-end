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
const exam_validation_1 = require("./exam.validation");
const exam_controller_1 = require("./exam.controller");
const examRouter = (0, express_1.Router)();
examRouter.post(
  "/create-exam",
  (0, validateRequest_1.default)(
    exam_validation_1.examValidation.createExamSchema,
  ),
  exam_controller_1.examController.createExam,
);
examRouter.get("/", exam_controller_1.examController.getExam);
examRouter.get("/:slug", exam_controller_1.examController.getSingleExam);
examRouter.delete("/:slug", exam_controller_1.examController.deleteExam);
examRouter.patch(
  "/:slug",
  (0, validateRequest_1.default)(
    exam_validation_1.examValidation.updateExamSchema,
  ),
  exam_controller_1.examController.updateExam,
);
exports.default = examRouter;
