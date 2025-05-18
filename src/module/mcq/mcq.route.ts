import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { mcqValidation } from "./mcq.validation";
import { mcqQuestiionController } from "./mcq.controller";

const mcqRoute = Router();
mcqRoute.post(
  "/create-mcq",
  validateRequest(mcqValidation.createMcqQuestionSchema),
  mcqQuestiionController.createMcq,
);
mcqRoute.get("/", mcqQuestiionController.getAllMCQ);
mcqRoute.get("/single/:id", mcqQuestiionController.getSingleMcq);
mcqRoute.get("/:id", mcqQuestiionController.getSpeecificMccq);
mcqRoute.patch(
  "/:id",
  validateRequest(mcqValidation.updateMcqQuestionSchema),
  mcqQuestiionController.updateMCQ,
);
mcqRoute.delete("/:id", mcqQuestiionController.deleteMCQ);
export default mcqRoute;
