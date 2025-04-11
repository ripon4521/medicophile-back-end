import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { gapsQuestionValidation } from "./gapsQuestion.validation";
import { gapsQuestionController } from "./gapsQuestion.controller";

const gapsQuestionRouter = Router();
gapsQuestionRouter.post(
  "/create-gapquestion",
  validateRequest(gapsQuestionValidation.createGapsQuestionSchema),
  gapsQuestionController.createGapQuestion,
);
gapsQuestionRouter.get("/", gapsQuestionController.getAllGapQuestions);
gapsQuestionRouter.delete(
  "/delete-gapquestion",
  gapsQuestionController.deleteGapQuestion,
);
gapsQuestionRouter.patch(
  "/update-question",
  validateRequest(gapsQuestionValidation.updateGapsQuestionSchema),
  gapsQuestionController.updateGapQuestion,
);
export default gapsQuestionRouter;
