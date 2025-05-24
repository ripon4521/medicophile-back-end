import { Router } from "express";
import { classQuizeQuestionValidation } from "./classQuizeQuestion.validation";
import { cqQuestionController } from "./classQuizeQuestion.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const cqQuestionRouter = Router();
cqQuestionRouter.post(
  "/create-cqquestion",
  authUser("admin", "superAdmin", "teacher"), onlyAdminAndFacultyAndStudent("admin", "teacher", "superAdmin"),
  validateRequest(classQuizeQuestionValidation.createCqQuestionSchema),
  cqQuestionController.createCqQuestion,
);
cqQuestionRouter.get("/", cqQuestionController.getAllCqQuestion);
cqQuestionRouter.get("/specifiq/:id", cqQuestionController.getSpeecificCaq);
cqQuestionRouter.get("/:id", cqQuestionController.getSingleQuestion);
cqQuestionRouter.patch(
  "/update-cqquestion",
   authUser("admin", "superAdmin", "teacher"), onlyAdminAndFacultyAndStudent("admin", "teacher", "superAdmin"),
  validateRequest(classQuizeQuestionValidation.updateCqQuestionSchema),
  cqQuestionController.updateCqQuestion,
);
cqQuestionRouter.delete(
  "/delete-cqquestion",
   authUser("admin", "superAdmin", "teacher"), onlyAdminAndFacultyAndStudent("admin", "teacher", "superAdmin"),
  cqQuestionController.deleteCqQuestion,
);
export default cqQuestionRouter;
