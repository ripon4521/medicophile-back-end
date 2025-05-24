import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { gapsQuestionValidation } from "./gapsQuestion.validation";
import { gapsQuestionController } from "./gapsQuestion.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const gapsQuestionRouter = Router();
gapsQuestionRouter.post(
  "/create-gapquestion",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(gapsQuestionValidation.createGapsQuestionSchema),
  gapsQuestionController.createGapQuestion,
);
gapsQuestionRouter.get("/", gapsQuestionController.getAllGapQuestions);
gapsQuestionRouter.get("/single/:id", gapsQuestionController.getSingleGaps);
gapsQuestionRouter.get("/:id", gapsQuestionController.getSpeecificGaps);
gapsQuestionRouter.delete(
  "/delete-gapquestion",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  gapsQuestionController.deleteGapQuestion,
);
gapsQuestionRouter.patch(
  "/update-question",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(gapsQuestionValidation.updateGapsQuestionSchema),
  gapsQuestionController.updateGapQuestion,
);
export default gapsQuestionRouter;
