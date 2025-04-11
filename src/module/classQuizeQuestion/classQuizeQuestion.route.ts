import { Router } from "express";
import { classQuizeQuestionValidation } from "./classQuizeQuestion.validation";
import { cqQuestionController } from "./classQuizeQuestion.controller";
import validateRequest from "../../middlewares/validateRequest";

const cqQuestionRouter = Router();
cqQuestionRouter.post(
  "/create-cqquestion",
  validateRequest(classQuizeQuestionValidation.createCqQuestionSchema),
  cqQuestionController.createCqQuestion,
);
cqQuestionRouter.get("/", cqQuestionController.getAllCqQuestion);
cqQuestionRouter.patch(
  "/update-cqquestion",
  validateRequest(classQuizeQuestionValidation.updateCqQuestionSchema),
  cqQuestionController.updateCqQuestion,
);
cqQuestionRouter.delete(
  "/delete-cqquestion",
  cqQuestionController.deleteCqQuestion,
);
export default cqQuestionRouter;
