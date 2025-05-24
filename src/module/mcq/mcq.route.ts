import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { mcqValidation } from "./mcq.validation";
import { mcqQuestiionController } from "./mcq.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const mcqRoute = Router();
mcqRoute.post(
  "/create-mcq",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(mcqValidation.createMcqQuestionSchema),
  mcqQuestiionController.createMcq,
);
mcqRoute.get("/", mcqQuestiionController.getAllMCQ);
mcqRoute.get("/single/:id", mcqQuestiionController.getSingleMcq);
mcqRoute.get("/:id", mcqQuestiionController.getSpeecificMccq);
mcqRoute.patch(
  "/:id",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(mcqValidation.updateMcqQuestionSchema),
  mcqQuestiionController.updateMCQ,
);
mcqRoute.delete("/:id",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  mcqQuestiionController.deleteMCQ);
export default mcqRoute;
